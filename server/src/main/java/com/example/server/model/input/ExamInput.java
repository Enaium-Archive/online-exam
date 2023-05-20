package com.example.server.model.input;

import java.time.LocalDateTime;
import java.util.Date;

import com.example.server.model.Exam;
import lombok.Data;
import org.babyfish.jimmer.Input;

import org.jetbrains.annotations.Nullable;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Data
public class ExamInput implements Input<Exam> {
    private static final Converter CONVERTER = Mappers.getMapper(Converter.class);

    @Nullable
    private Long id;

    @Nullable
    private Long peopleId;

    @Nullable
    private Long paperId;

    @Nullable
    private LocalDateTime startTime;

    @Override
    public Exam toEntity() {
        return CONVERTER.toExam(this);
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        Exam toExam(ExamInput input);
    }
}

