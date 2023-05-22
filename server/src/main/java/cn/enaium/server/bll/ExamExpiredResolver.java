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

package cn.enaium.server.bll;

import cn.enaium.server.model.ExamTable;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.TransientResolver;
import org.babyfish.jimmer.sql.ast.tuple.Tuple3;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 计算考试是否过期
 *
 * @author Enaium
 */
@Component
@AllArgsConstructor
public class ExamExpiredResolver implements TransientResolver<Long, Boolean> {

    private final JSqlClient sql;

    @Override
    public Map<Long, Boolean> resolve(Collection<Long> longs) {
        final ExamTable table = ExamTable.$;
        return sql.createQuery(table)
                .where(table.id().in(longs))
                .select(table.id(), table.startTime(), table.asTableEx().paper().expired())
                .execute().stream().collect(Collectors.toMap(Tuple3<Long, LocalDateTime, Integer>::get_1, e -> e.get_2().plusSeconds(e.get_3()).isBefore(LocalDateTime.now())));
    }
}
