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

package cn.enaium.server.bll;

import cn.enaium.server.model.common.BaseEntityDraft;
import cn.enaium.server.model.common.BaseEntityProps;
import org.babyfish.jimmer.ImmutableObjects;
import org.babyfish.jimmer.sql.DraftInterceptor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author Enaium
 */
@Component
public class BaseEntityDraftInterceptor implements DraftInterceptor<BaseEntityDraft> {
    @Override
    public void beforeSave(@NotNull BaseEntityDraft draft, boolean isNew) {
        if (!ImmutableObjects.isLoaded(draft, BaseEntityProps.MODIFIED_TIME)) {
            draft.setModifiedTime(LocalDateTime.now());
        }
        if (isNew && !ImmutableObjects.isLoaded(draft, BaseEntityProps.CREATED_TIME)) {
            draft.setCreatedTime(LocalDateTime.now());
        }
    }
}
