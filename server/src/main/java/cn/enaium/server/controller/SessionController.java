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

import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import cn.enaium.server.model.People;
import cn.enaium.server.model.input.PeopleInput;
import cn.enaium.server.model.response.LoginResponse;
import cn.enaium.server.repository.PeopleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

/**
 * @author Enaium
 */
@SaIgnore
@RestController
@AllArgsConstructor
public class SessionController {

    private final PeopleRepository peopleRepository;

    /**
     * 登录
     *
     * @param peopleInput 用户输入
     * @return 会话令牌
     */
    @PutMapping("/sessions/")
    public LoginResponse login(@RequestBody PeopleInput peopleInput) {
        People people = peopleRepository.findByUsername(peopleInput.getUsername());
        if (people != null) {
            if (Objects.equals(peopleInput.getPassword(), people.password())) {
                return new LoginResponse(people.id(), StpUtil.createLoginSession(people.id()));
            } else {
                throw new RuntimeException("密码错误");
            }
        }
        throw new RuntimeException("用户不存在");
    }

    /**
     * 登出
     */
    @DeleteMapping("/sessions/")
    @ResponseStatus(HttpStatus.OK)
    public void logout() {
        StpUtil.logout();
    }
}
