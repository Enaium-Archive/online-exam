package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

import java.util.List;


@Entity
@Table(name = "question")
public interface Question extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String title();

    QuestionType type();

    @ManyToMany(mappedBy = "questions")
    List<Paper> papers();
}
