package com.example.server.bll;

import com.example.server.model.PaperTable;
import lombok.AllArgsConstructor;
import org.babyfish.jimmer.sql.JSqlClient;
import org.babyfish.jimmer.sql.TransientResolver;
import org.babyfish.jimmer.sql.ast.tuple.Tuple2;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

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
