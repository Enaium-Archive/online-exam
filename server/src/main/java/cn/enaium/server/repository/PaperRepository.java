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

import cn.enaium.server.model.Paper;
import cn.enaium.server.model.PaperTable;
import cn.enaium.server.model.input.PaperInput;
import org.babyfish.jimmer.spring.repository.JRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;

/**
 * @author Enaium
 */
public interface PaperRepository extends JRepository<Paper, Long> {
    default Page<Paper> findAllByPaper(PageRequest of, PaperInput paperInput) {
        final PaperTable table = PaperTable.$;
        return pager(of).execute(
                sql().createQuery(table)
                        .whereIf(paperInput != null && StringUtils.hasText(paperInput.getTitle()), table.title().ilike(paperInput.getTitle()))
                        .select(table)
        );
    }
}
