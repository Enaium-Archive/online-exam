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

package cn.enaium.server.model;

import cn.enaium.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;
import org.jetbrains.annotations.Nullable;

/**
 * @author Enaium
 */
@Entity
@Table(name = "answer")
public interface Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    @Key
    long questionId();

    @ManyToOne
    Question question();

    @Key
    long peopleId();

    @ManyToOne
    People people();

    @Key
    long examId();

    @ManyToOne
    Exam exam();

    @Key
    long paperId();

    @ManyToOne
    Paper paper();

    String answer();

    @Nullable
    Boolean state();

    @Nullable
    String reason();
}
