package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.example.server.model.input.QuestionInput;
import com.example.server.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问题控制器
 */
@RestController
@AllArgsConstructor
public class QuestionController {

    private final QuestionRepository questionRepository;

    /**
     * 创建问题
     *
     * @param questionInput 问题输入
     */
    @PutMapping("/questions/")
    @SaCheckRole(value = {"admin", "teacher"}, mode = SaMode.OR)
    public void createQuestion(@RequestBody QuestionInput questionInput) {
        questionRepository.insert(questionInput);
    }
}
