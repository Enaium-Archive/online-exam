package com.example.server.repository;

import com.example.server.model.Exam;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ExamRepository extends JRepository<Exam, Long> {
    Page<Exam> findAllByPeopleId(Pageable pageable, Long peopleId);
}
