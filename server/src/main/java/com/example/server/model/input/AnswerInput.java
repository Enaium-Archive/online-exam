package com.example.server.model.input;

import com.example.server.model.Answer;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.jetbrains.annotations.NotNull;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class AnswerInput implements Input<Answer> {
    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    private Long id;

    private long questionId;

    private long peopleId;

    private long examId;

    private String answer;


    @Override
    public Answer toEntity() {
        return CONVERTER.toAnswerRecord(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        Answer toAnswerRecord(AnswerInput input);
    }
}

