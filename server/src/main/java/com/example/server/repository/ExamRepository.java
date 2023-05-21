package com.example.server.repository;

import com.example.server.model.Exam;
import com.example.server.model.ExamFetcher;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ExamRepository extends JRepository<Exam, Long> {
    Page<Exam> findAllByPeopleId(Pageable pageable, Long peopleId, Fetcher<Exam> fetcher);
}
