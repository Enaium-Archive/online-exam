package com.example.server.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.example.server.model.input.QuestionInput;
import com.example.server.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class QuestionController {


    private final QuestionRepository questionRepository;

    @PutMapping("/questions/")
    @SaCheckRole("teacher")
    public void createQuestion(@RequestBody QuestionInput questionInput) {
        questionRepository.save(questionInput);
    }
}
