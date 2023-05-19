package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "exam")
public interface Exam extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    Long peopleId();

    @ManyToOne
    People people();

    Long paperId();

    @ManyToOne
    Paper paper();

    LocalDateTime startTime();
}
