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

import cn.enaium.server.model.Question;
import cn.enaium.server.model.QuestionTable;
import cn.enaium.server.model.input.QuestionInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;


/**
 * @author Enaium
 */
public interface QuestionRepository extends JRepository<Question, Long> {
    default Page<Question> findAllByQuestion(PageRequest of, @Nullable QuestionInput questionInput) {
        final QuestionTable table = QuestionTable.$;
        return pager(of).execute(
                sql().createQuery(table)
                        .whereIf(questionInput != null && StringUtils.hasText(questionInput.getTitle()), table.title().ilike(questionInput.getTitle()))
                        .select(table)
        );
    }
}
