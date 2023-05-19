package com.example.server.repository;

import com.example.server.model.Paper;
import org.babyfish.jimmer.spring.repository.JRepository;


public interface PaperRepository extends JRepository<Paper, Long> {
}
