package com.example.server.controller;

import com.example.server.model.People;
import com.example.server.model.PeopleFetcher;
import com.example.server.model.RoleFetcher;
import com.example.server.repository.PeopleRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PeopleController {

    private final PeopleRepository peopleRepository;

    private static final PeopleFetcher DEFAULT_PEOPLE = PeopleFetcher.$
            .allScalarFields()
            .password(false)
            .role(RoleFetcher.$.name());

    @GetMapping("/people/{id}")
    public @FetchBy("DEFAULT_PEOPLE") People findPeople(@PathVariable Long id) {
        return peopleRepository.findNullable(id, DEFAULT_PEOPLE);
    }
}
