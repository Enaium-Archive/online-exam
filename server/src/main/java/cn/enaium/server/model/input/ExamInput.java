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

package cn.enaium.server.model.input;

import java.time.LocalDateTime;

import cn.enaium.server.model.Exam;
import lombok.Data;
import org.babyfish.jimmer.Input;

import org.jetbrains.annotations.Nullable;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

/**
 * @author Enaium
 */
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

