package com.example.server.controller;

import com.example.server.repository.ExamRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 考试控制器
 */
@RestController
@AllArgsConstructor
public class ExamController {


    private final ExamRepository examRepository;

    /**
     * 查询考试
     *
     * @param peopleId 人员ID
     */
    @GetMapping("/people/{peopleId}/exams/")
    public void findExams(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @PathVariable Long peopleId) {
        examRepository.findAllByPeopleId(PageRequest.of(page, size), peopleId);
    }
}
