package com.example.server.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.example.server.model.*;
import com.example.server.model.input.AnswerInput;
import com.example.server.repository.AnswerRepository;
import com.example.server.repository.ExamRepository;
import com.example.server.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.sql.JSqlClient;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AnswerController {

    private final AnswerRepository answerRepository;
    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final JSqlClient sql;

    @GetMapping("/exams/{examId}/questions/{questionsId}/answers/")
    public Answer findAnswer(@PathVariable Long examId, @PathVariable Long questionsId) {
        // 检查考试是否存在
        examRepository.findById(examId).orElseThrow(() -> new NullPointerException("考试不存在"));

        //查询答案
        return answerRepository.findByPeopleIdAndExamIdAndQuestionId(StpUtil.getLoginIdAsLong(), examId, questionsId);
    }

    @PutMapping("/answers/")
    public void saveAnswer(@RequestBody AnswerInput answerInput) {
        // 检查考试是否存在
        final Exam exam = examRepository.findById(answerInput.getExamId(), ExamFetcher.$.allScalarFields().expired()).orElseThrow(() -> new NullPointerException("考试不存在"));

        if (exam.submitted()) {
            throw new NullPointerException("考试已提交");
        }

        if (exam.expired()) {
            throw new NullPointerException("考试已过期");
        }


        if (answerInput.getPeopleId() != StpUtil.getLoginIdAsLong()) {
            throw new NullPointerException("人员id不匹配");
        }

        if (exam.peopleId() != StpUtil.getLoginIdAsLong()) {
            throw new NullPointerException("人员id不匹配");
        }

        // 检查题目是否存在
        final Question question = questionRepository.findById(answerInput.getQuestionId()).orElseThrow(() -> new NullPointerException("题目不存在"));
        // 检查题目是否属于该试卷
        sql.createQuery(PaperTable.$)//查询试卷表
                .where(PaperTable.$.id().eq(exam.paperId()), PaperTableEx.$.questions().id().eq(question.id()))//查询试卷id和题目id
                .select(PaperTableEx.$.questions().id())//查询题目id
                .fetchOptional().orElseThrow(() -> new NullPointerException("题目不属于该试卷"));//如果不存在则抛出异常

        //插入或更新答案
        answerRepository.save(AnswerDraft.$.produce(draft -> {
            draft.setPeopleId(answerInput.getPeopleId());
            draft.setExamId(answerInput.getExamId());
            draft.setQuestionId(answerInput.getQuestionId());
            draft.setAnswer(answerInput.getAnswer());
            draft.setPaperId(exam.paperId());
        }));
    }
}
