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

import cn.enaium.server.bll.PaperQuestionCountResolver;
import cn.enaium.server.model.common.BaseEntity;
import org.babyfish.jimmer.sql.*;

import java.util.List;


/**
 * @author Enaium
 */
@Entity
@Table(name = "paper")
public interface Paper extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id();

    String title();

    Integer expired();

    @ManyToMany
    @JoinTable(name = "paper_question_mapping",
            joinColumnName = "paper_id",
            inverseJoinColumnName = "question_id")
    List<Question> questions();

    @Transient(PaperQuestionCountResolver.class)
    long question();
}
