package com.example.server.model;

import com.example.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;


@Entity
@Table(name = "people")
public interface People extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String username();

    String password();

    Integer role();
}
