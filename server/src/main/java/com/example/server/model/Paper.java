package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

import java.util.List;


@Entity
@Table(name = "paper")
public interface Paper extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String title();

    Integer expired();

    @ManyToMany
    @JoinTable(name = "paper_question_mapping",
            joinColumnName = "paper_id",
            inverseJoinColumnName = "question_id")
    List<Question> questions();
}
