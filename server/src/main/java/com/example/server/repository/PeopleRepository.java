package com.example.server.repository;

import com.example.server.model.People;
import org.babyfish.jimmer.spring.repository.JRepository;

import java.util.Optional;


public interface PeopleRepository extends JRepository<People, Long> {
    People findByUsername(String username);
}
