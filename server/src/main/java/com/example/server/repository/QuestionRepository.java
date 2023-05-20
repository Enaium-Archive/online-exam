package com.example.server.repository;

import com.example.server.model.Question;
import com.example.server.model.QuestionTable;
import com.example.server.model.input.QuestionInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;


public interface QuestionRepository extends JRepository<Question, Long> {
    default Page<Question> findAllByQuestion(PageRequest of, @Nullable QuestionInput questionInput) {
        final QuestionTable table = QuestionTable.$;
        return pager(of).execute(
                sql().createQuery(table)
                        .whereIf(questionInput != null && StringUtils.hasText(questionInput.getTitle()), table.title().ilike(questionInput.getTitle()))
                        .select(table)
        );
    }
}
