/*
 * This is a simple examination system
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package cn.enaium.server.controller;

import cn.enaium.server.model.People;
import cn.enaium.server.model.PeopleFetcher;
import cn.enaium.server.model.RoleFetcher;
import cn.enaium.server.repository.PeopleRepository;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.client.FetchBy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Enaium
 */
@RestController
@AllArgsConstructor
public class PeopleController {

    private final PeopleRepository peopleRepository;

    private static final PeopleFetcher DEFAULT_PEOPLE = PeopleFetcher.$
            .allScalarFields()
            .password(false)
            .role(RoleFetcher.$.name());

    @GetMapping("/people/{id}/")
    public @FetchBy("DEFAULT_PEOPLE") People findPeople(@PathVariable Long id) {
        return peopleRepository.findNullable(id, DEFAULT_PEOPLE);
    }
}
