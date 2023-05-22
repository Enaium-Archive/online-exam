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

import cn.enaium.server.model.PaperTable;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.TransientResolver;
import org.babyfish.jimmer.sql.ast.tuple.Tuple2;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Enaium
 */
@Component
@AllArgsConstructor
public class PaperQuestionCountResolver implements TransientResolver<Long, Long> {

    private final JSqlClient sql;

    @Override
    public Map<Long, Long> resolve(Collection<Long> longs) {
        final PaperTable table = PaperTable.$;
        return sql.createQuery(table)
                .where(table.id().in(longs))
                .groupBy(table.id())
                .select(table.id(), table.asTableEx().questions().count()).execute()
                .stream()
                .collect(
                        Collectors.toMap(Tuple2::get_1, Tuple2::get_2)
                );
    }

    @Override
    public Long getDefaultValue() {
        return 0L;
    }
}
