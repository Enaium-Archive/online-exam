package com.example.server.repository;

import com.example.server.model.Exam;
import com.example.server.model.ExamTable;
import com.example.server.model.input.ExamInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static com.example.server.controller.ExamController.COMPLETE_EXAM;

public interface ExamRepository extends JRepository<Exam, Long> {
    Page<Exam> findAllByPeopleId(Pageable pageable, Long peopleId, Fetcher<Exam> fetcher);

    default Page<Exam> findAllByExam(Pageable pageable, @Nullable ExamInput examInput) {
        final ExamTable table = ExamTable.$;
        return pager(pageable).execute(sql().createQuery(table)
                .whereIf(examInput != null && examInput.getPeopleId() != null, table.peopleId().eq(examInput.getPeopleId()))
                .whereIf(examInput != null && examInput.getPaperId() != null, table.paperId().eq(examInput.getPaperId()))
                .select(table.fetch(COMPLETE_EXAM))
        );
    }
}
