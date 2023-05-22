/*
 * Copyright (c) 2023 Enaium
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package cn.enaium.server.interceptor;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import cn.enaium.server.model.People;
import cn.enaium.server.model.PeopleFetcher;
import cn.enaium.server.model.RoleFetcher;
import cn.enaium.server.repository.PeopleRepository;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

/**
 * @author Enaium
 */
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
