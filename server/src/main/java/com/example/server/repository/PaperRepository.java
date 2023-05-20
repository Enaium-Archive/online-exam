package com.example.server.repository;

import com.example.server.model.Paper;
import com.example.server.model.PaperTable;
import com.example.server.model.input.PaperInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;


public interface PaperRepository extends JRepository<Paper, Long> {
    default Page<Paper> findAllByPaper(PageRequest of, PaperInput paperInput) {
        final PaperTable table = PaperTable.$;
        return pager(of).execute(
                sql().createQuery(table)
                        .whereIf(paperInput != null && StringUtils.hasText(paperInput.getTitle()), table.title().ilike(paperInput.getTitle()))
                        .select(table)
        );
    }
}
