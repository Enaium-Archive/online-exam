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

    @ManyToOne
    Question question();

    Long peopleId();

    @ManyToOne
    People people();

    Long examId();

    @ManyToOne
    Exam exam();

    Long paperId();

    @ManyToOne
    Paper paper();

    String answer();
}
