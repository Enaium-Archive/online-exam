package com.example.server.model.input;

import com.example.server.model.AnswerRecord;
import lombok.Data;
import org.babyfish.jimmer.Input;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class AnswerRecordInput implements Input<AnswerRecord> {
    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    private Long id;

    private Long questionId;

    private Long peopleId;

    private Long examId;

    private Long paperId;


    @Override
    public AnswerRecord toEntity() {
        return CONVERTER.toAnswerRecord(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        AnswerRecord toAnswerRecord(AnswerRecordInput input);
    }
}

