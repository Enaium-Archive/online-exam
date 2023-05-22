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

import { NLayout, NLayoutContent, NLayoutSider, NMenu, type MenuOption } from "naive-ui"
import { defineComponent } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to={{ name: "question-manager" }}>题目管理</RouterLink>,
    key: "question-manager"
  },
  {
    label: () => <RouterLink to={{ name: "paper-manager" }}>试卷管理</RouterLink>,
    key: "paper-manager"
  },
  {
    label: () => <RouterLink to={{ name: "exam-manager" }}>考试管理</RouterLink>,
    key: "exam-manager"
  }
]

export default defineComponent(() => {
  const route = useRoute()

  return () => (
    <div>
      <NLayout hasSider>
        <NLayoutSider>
          <NMenu options={menuOptions} value={route.name as string} mode="vertical" />
        </NLayoutSider>
        <NLayout>
          <NLayoutContent>
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </div>
  )
})
