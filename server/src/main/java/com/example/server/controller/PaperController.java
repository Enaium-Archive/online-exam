package com.example.server.controller;

import com.example.server.model.Paper;
import com.example.server.model.input.PaperInput;
import com.example.server.repository.PaperRepository;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * 试卷控制器
 */
@RestController
@AllArgsConstructor
public class PaperController {

    private final PaperRepository paperRepository;

    /**
     * 创建试卷
     *
     * @param paperInput 试卷输入
     */
    @PutMapping("/papers/")
    @Transactional
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

    @PutMapping("/papers/{paperId}/questions/")
    public void addQuestions(@PathVariable String paperId, @RequestParam Long[] questionIds) {

    }
}
