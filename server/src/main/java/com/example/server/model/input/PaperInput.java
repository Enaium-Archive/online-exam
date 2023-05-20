package com.example.server.model.input;

import com.example.server.model.Paper;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.jetbrains.annotations.Nullable;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Data
public class PaperInput implements Input<Paper> {
    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Nullable
    private Long id;

    @Nullable
    private String title;

    @Nullable
    private Long expired;


    @Override
    public Paper toEntity() {
        return CONVERTER.toPaper(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        Paper toPaper(PaperInput input);
    }
}

