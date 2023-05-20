package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.example.server.model.Question;
import com.example.server.model.input.QuestionInput;
import com.example.server.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

/**
 * 问题控制器
 */
@RestController
@AllArgsConstructor
@SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
public class QuestionController {

    private final QuestionRepository questionRepository;

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
}
