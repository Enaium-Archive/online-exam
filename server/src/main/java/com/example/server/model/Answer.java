package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;
import org.jetbrains.annotations.Nullable;

@Entity
@Table(name = "answer")
public interface Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    @Key
    long questionId();

    @ManyToOne
    Question question();

    @Key
    long peopleId();

    @ManyToOne
    People people();

    @Key
    long examId();

    @ManyToOne
    Exam exam();

    @Key
    long paperId();

    @ManyToOne
    Paper paper();

    String answer();

    @Nullable
    Boolean state();

    @Nullable
    String reason();
}
