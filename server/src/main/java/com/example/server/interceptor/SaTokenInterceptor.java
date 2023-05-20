package com.example.server.interceptor;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.example.server.model.People;
import com.example.server.model.PeopleFetcher;
import com.example.server.model.RoleFetcher;
import com.example.server.repository.PeopleRepository;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class SaTokenInterceptor extends SaInterceptor implements StpInterface {


    private final PeopleRepository peopleRepository;

    public SaTokenInterceptor(PeopleRepository peopleRepository) {
        super(r -> SaRouter.match("/**").notMatch("/typescript.zip").notMatchMethod("OPTIONS").check(c -> {
            StpUtil.checkLogin();
        }));
        this.peopleRepository = peopleRepository;
    }


    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return Collections.emptyList();
    }

    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        final People nullable = peopleRepository.findNullable(Long.parseLong(loginId.toString()), PeopleFetcher.$.role(RoleFetcher.$.name()));
        if (nullable == null) {
            return Collections.emptyList();
        }
        return Collections.singletonList(nullable.role().name());
    }
}
