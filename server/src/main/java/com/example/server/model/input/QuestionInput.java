package com.example.server.model.input;

import com.example.server.model.Question;
import com.example.server.model.QuestionType;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.jetbrains.annotations.Nullable;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class QuestionInput implements Input<Question> {
    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Nullable
    private Long id;

    @Nullable
    private String title;

    @Nullable
    private QuestionType type;


    @Override
    public Question toEntity() {
        return CONVERTER.toQuestion(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        Question toQuestion(QuestionInput input);
    }
}

