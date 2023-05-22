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

package cn.enaium.server.repository;

import cn.enaium.server.model.ExamTable;
import cn.enaium.server.model.Exam;
import cn.enaium.server.model.input.ExamInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.babyfish.jimmer.sql.fetcher.Fetcher;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static cn.enaium.server.controller.ExamController.COMPLETE_EXAM;

/**
 * @author Enaium
 */
public interface ExamRepository extends JRepository<Exam, Long> {
    Page<Exam> findAllByPeopleId(Pageable pageable, Long peopleId, Fetcher<Exam> fetcher);

    default Page<Exam> findAllByExam(Pageable pageable, @Nullable ExamInput examInput) {
        final ExamTable table = ExamTable.$;
        return pager(pageable).execute(sql().createQuery(table)
                .whereIf(examInput != null && examInput.getPeopleId() != null, table.peopleId().eq(examInput.getPeopleId()))
                .whereIf(examInput != null && examInput.getPaperId() != null, table.paperId().eq(examInput.getPaperId()))
                .select(table.fetch(COMPLETE_EXAM))
        );
    }
}
