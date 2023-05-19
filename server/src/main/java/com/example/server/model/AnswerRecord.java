package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

@Entity
@Table(name = "answer_record")
public interface AnswerRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    Long questionId();

    Long peopleId();

    Long examId();

    Long paperId();

    String answer();
}
