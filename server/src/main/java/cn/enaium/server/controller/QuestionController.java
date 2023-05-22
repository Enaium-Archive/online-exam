/*
 * This is a simple examination system
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package cn.enaium.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.enaium.server.model.*;
import cn.enaium.server.repository.ExamRepository;
import cn.enaium.server.model.*;
import cn.enaium.server.model.input.QuestionInput;
import cn.enaium.server.model.response.QAResponse;
import cn.enaium.server.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.JoinType;
import org.babyfish.jimmer.sql.ast.Expression;
import org.babyfish.jimmer.sql.ast.Predicate;
import org.babyfish.jimmer.sql.ast.table.WeakJoin;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

/**
 * @author Enaium
 */
@RestController
@AllArgsConstructor
@SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;
    private final JSqlClient sql;

    /**
     * 保存问题
     *
     * @param questionInput 问题输入
     */
    @PutMapping("/questions/")
    public void saveQuestion(@RequestBody QuestionInput questionInput) {
        questionRepository.save(questionInput);
    }

    /**
     * 查询问题
     *
     * @param page          页码
     * @param size          页大小
     * @param questionInput 问题输入
     * @return 问题分页
     */
    @GetMapping("/questions/")
    public Page<Question> findQuestions(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @Nullable QuestionInput questionInput
    ) {
        return questionRepository.findAllByQuestion(PageRequest.of(page, size), questionInput);
    }


    /**
     * 查询试卷答案包括未做的题目
     *
     * @param page   页码
     * @param size   页大小
     * @param examId 考试id
     * @return 问题分页
     */
    @GetMapping("/exams/{examId}/questions/answers/")
    public Page<QAResponse<@FetchBy("QUESTION_FETCHER") Question, @FetchBy("ANSWER_FETCHER") Answer>> findAnswers(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @PathVariable Long examId) {
        // 检查考试是否存在
        examRepository.findById(examId).orElseThrow(() -> new NullPointerException("考试不存在"));

        final ExamTable exam = ExamTable.$;

        return examRepository.pager(PageRequest.of(page, size)).execute(
                sql.createQuery(exam)
                        .where(exam.id().eq(examId))
                        .select(
                                exam.paper(JoinType.LEFT).asTableEx().questions(JoinType.LEFT).fetch(QUESTION_FETCHER),
                                exam.paper(JoinType.LEFT).asTableEx().questions(JoinType.LEFT).weakJoin(AnswerWeakJoin.class, JoinType.LEFT).fetch(ANSWER_FETCHER)
                        )
        ).map(tuple -> new QAResponse<>((Question) tuple.get(0), (Answer) tuple.get(1)));
    }

    private static class AnswerWeakJoin implements WeakJoin<QuestionTable, AnswerTable> {
        @Override
        public Predicate on(QuestionTable question, AnswerTable answer) {
            return Predicate.sql("%e = %e AND %e = tb_1_.ID", new Expression[]{answer.questionId(), question.id(), answer.examId()});
        }
    }

    public static final QuestionFetcher QUESTION_FETCHER = QuestionFetcher.$.title().type();
    private static final AnswerFetcher ANSWER_FETCHER = AnswerFetcher.$.answer().state().reason();
}
