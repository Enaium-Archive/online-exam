package com.example.server.model.common;

import org.babyfish.jimmer.sql.MappedSuperclass;

import java.time.LocalDateTime;

@MappedSuperclass
public interface BaseEntity {

    LocalDateTime createdTime();

    LocalDateTime modifiedTime();
}