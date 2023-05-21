package com.example.server.repository;

import com.example.server.model.Answer;
import org.babyfish.jimmer.spring.repository.JRepository;

public interface AnswerRepository extends JRepository<Answer, Long> {
    Answer findByPeopleIdAndExamIdAndQuestionId(long peopleId, long examId, long questionId);
}
