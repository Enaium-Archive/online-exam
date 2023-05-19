package com.example.server.model.input;

import com.example.server.model.People;
import lombok.Data;
import org.babyfish.jimmer.Input;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class PeopleInput implements Input<People> {

    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    private Long id;

    private String username;

    private String password;

    private Integer role;

    @Override
    public People toEntity() {
        return CONVERTER.toPeople(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        People toPeople(PeopleInput input);
    }
}

