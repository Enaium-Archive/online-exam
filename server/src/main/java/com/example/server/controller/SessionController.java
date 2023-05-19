package com.example.server.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.example.server.model.People;
import com.example.server.model.input.PeopleInput;
import com.example.server.repository.PeopleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

/**
 * 会话控制器
 */
@RestController
@AllArgsConstructor
public class SessionController {

    private final PeopleRepository peopleRepository;

    /**
     * 登录
     * @param peopleInput 用户输入
     * @return 会话令牌
     */
    @PutMapping("/sessions/")
    public String login(@RequestBody PeopleInput peopleInput) {
        People people = peopleRepository.findByUsername(peopleInput.getUsername());
        if (people != null) {
            if (Objects.equals(peopleInput.getPassword(), people.password())) {
                return StpUtil.createLoginSession(people.id());
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
