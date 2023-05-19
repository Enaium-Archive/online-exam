package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;


@Entity
@Table(name = "paper")
public interface Paper extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String title();

    Integer expired();

}
