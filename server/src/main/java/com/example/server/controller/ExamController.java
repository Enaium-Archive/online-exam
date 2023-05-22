package com.example.server.controller;

import com.example.server.model.*;
import com.example.server.model.input.ExamInput;
import com.example.server.repository.ExamRepository;
import com.example.server.repository.PaperRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 考试控制器
 */
@RestController
@AllArgsConstructor
public class ExamController {

    private final ExamRepository examRepository;
    private final PaperRepository paperRepository;

    public static final ExamFetcher DEFAULT_EXAM = ExamFetcher.$.allScalarFields().paper(PaperFetcher.$.allScalarFields()).expired();
    public static final ExamFetcher COMPLETE_EXAM = ExamFetcher.$.allScalarFields().paper(PaperFetcher.$.allScalarFields()).people(PeopleFetcher.$.allScalarFields().password(false)).expired();

    /**
     * 查询考试
     *
     * @param peopleId 人员ID
     * @return 考试列表
     */
    @GetMapping("/people/{peopleId}/exams/")
    public Page<@FetchBy("DEFAULT_EXAM") Exam> findExams(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size, @PathVariable Long peopleId) {
        return examRepository.findAllByPeopleId(PageRequest.of(page, size), peopleId, DEFAULT_EXAM);
    }

    /**
     * 开始考试
     *
     * @param peopleId 人员ID
     * @param paperId  试卷ID
     * @return 考试ID
     */
    @PutMapping("/people/{peopleId}/exams/{paperId}/")
    public Exam startExam(@PathVariable Long peopleId, @PathVariable Long paperId) {
        final Paper paper = paperRepository.findNullable(paperId, PaperFetcher.$.allScalarFields().question());
        if (paper == null) {
            throw new NullPointerException("试卷不存在");
        }

        if (paper.question() == 0) {
            throw new NullPointerException("试卷没有题目");
        }

        return examRepository.insert(ExamDraft.$.produce((draft) -> {
            draft.setPeopleId(peopleId);
            draft.setPaperId(paperId);
            draft.setStartTime(LocalDateTime.now());
        }));
    }

    /**
     * 查询考试试卷的所有题目
     *
     * @param examId 考试ID
     * @return 题目列表
     */
    @GetMapping("/exams/{examId}/questions/")
    public List<Question> findQuestions(@PathVariable Long examId) {
        final Exam exam = examRepository.findNullable(examId, ExamFetcher.$.allScalarFields().paper(PaperFetcher.$.questions(QuestionFetcher.$.allScalarFields())));
        if (exam == null) {
            throw new NullPointerException("考试不存在");
        }
        return exam.paper().questions();
    }

    /**
     * 提交
     *
     * @param examId 试卷ID
     */
    @PutMapping("/exams/{examId}/submitted/")
    @ResponseStatus(HttpStatus.OK)
    public void submitted(@PathVariable Long examId) {
        examRepository.update(ExamDraft.$.produce(draft -> {
            draft.setId(examId);
            draft.setSubmitted(true);
        }));
    }

    /**
     * 批改
     *
     * @param examId 试卷ID
     */
    @PutMapping("/exams/{examId}/marked/")
    @ResponseStatus(HttpStatus.OK)
    public void marked(@PathVariable Long examId) {
        examRepository.update(ExamDraft.$.produce(draft -> {
            draft.setId(examId);
            draft.setMarked(true);
        }));
    }

    @GetMapping("/exams/")
    public Page<@FetchBy("COMPLETE_EXAM") Exam> findComplexExams(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @Nullable ExamInput examInput) {
        return examRepository.findAllByExam(PageRequest.of(page, size), examInput);
    }
}
