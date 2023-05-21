package com.example.server.bll;

import com.example.server.model.ExamTable;
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
