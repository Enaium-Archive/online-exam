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
import cn.enaium.server.model.input.PaperInput;
import cn.enaium.server.model.*;
import cn.enaium.server.repository.PaperRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.ast.query.ConfigurableSubQuery;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * 试卷控制器
 */
/**
 * @author Enaium
 */
@RestController
@AllArgsConstructor
public class PaperController {

    private final PaperRepository paperRepository;
    private final JSqlClient sql;

    /**
     * 创建试卷
     *
     * @param paperInput 试卷输入
     */
    @SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
    @PutMapping("/papers/")
    public void savePaper(@RequestBody PaperInput paperInput) {
        paperRepository.save(paperInput);
    }

    /**
     * 查询试卷
     *
     * @param page 页码
     * @param size 页大小
     * @return 试卷分页
     */
    @GetMapping("/papers/")
    public Page<Paper> findPapers(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @Nullable PaperInput paperInput) {
        return paperRepository.findAllByPaper(PageRequest.of(page, size), paperInput);
    }

    /**
     * 查询没包含的题目
     *
     * @param page    页码
     * @param size    页大小
     * @param paperId 试卷ID
     * @return 题目分页
     */
    @SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
    @GetMapping("/papers/{paperId}/questions/not-include/")
    public Page<Question> findNotIncludeQuestions(@RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer size,
                                                  @PathVariable Long paperId) {
        final PageRequest pageable = PageRequest.of(page, size);
        final PaperTable paper = PaperTable.$;
        final QuestionTable question = QuestionTable.$;

        final ConfigurableSubQuery<Long> select = sql.createSubQuery(paper).where(paper.id().eq(paperId)).select(paper.asTableEx().questions().id());
        return paperRepository.pager(pageable).execute(sql.createQuery(question).where(question.id().notIn(select)).select(question));
    }

    /**
     * 查询包含的题目
     *
     * @param page    页码
     * @param size    页大小
     * @param paperId 试卷ID
     * @return 题目分页
     */
    @GetMapping("/papers/{paperId}/questions/include/")
    public Page<Question> findIncludeQuestions(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "10") Integer size,
                                               @PathVariable Long paperId) {
        final PageRequest pageable = PageRequest.of(page, size);
        final PaperTable paper = PaperTable.$;
        return paperRepository.pager(pageable).execute(sql.createQuery(paper).where(paper.id().eq(paperId)).select(paper.asTableEx().questions()));
    }


    /**
     * 添加试卷的题目
     *
     * @param paperId     试卷ID
     * @param questionIds 题目ID
     */
    @SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
    @PutMapping("/papers/{paperId}/questions/")
    public void addQuestions(@PathVariable Long paperId, @RequestParam Long[] questionIds) {
        sql.getAssociations(PaperProps.QUESTIONS).checkExistence().batchSave(Collections.singletonList(paperId), Arrays.stream(questionIds).collect(Collectors.toList()));
    }

    /**
     * 删除试卷的题目
     *
     * @param paperId     试卷ID
     * @param questionIds 题目ID
     */
    @SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
    @DeleteMapping("/papers/{paperId}/questions/")
    public void removeQuestions(@PathVariable Long paperId, @RequestParam Long[] questionIds) {
        sql.getAssociations(PaperProps.QUESTIONS).batchDelete(Collections.singletonList(paperId), Arrays.stream(questionIds).collect(Collectors.toList()));
    }
}
