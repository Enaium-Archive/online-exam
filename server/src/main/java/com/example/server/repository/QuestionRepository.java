package com.example.server.repository;

import com.example.server.model.Question;
import org.babyfish.jimmer.spring.repository.JRepository;


public interface QuestionRepository extends JRepository<Question, Long> {
}
