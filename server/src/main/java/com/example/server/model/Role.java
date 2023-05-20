package com.example.server.model;

import org.babyfish.jimmer.sql.*;

@Entity
@Table(name = "role")
public interface Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String name();
}
