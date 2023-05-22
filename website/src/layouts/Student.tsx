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

import { NLayout, NLayoutHeader, NMenu, type MenuOption } from "naive-ui"
import { defineComponent } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to={{ name: "paper-list" }}>试卷</RouterLink>,
    key: "paper-list"
  },
  {
    label: () => <RouterLink to={{ name: "exam-list" }}>考试记录</RouterLink>,
    key: "exam-list"
  }
]

export default defineComponent(() => {
  const route = useRoute()

  return () => (
    <>
      <NLayout class={"h-screen"}>
        <NLayoutHeader class={"h-16 flex justify-center items-center"} bordered>
          <NMenu options={menuOptions} mode="horizontal" value={route.name as string} />
        </NLayoutHeader>
        <NLayout style={{ top: "64px" }} position={"absolute"} hasSider>
          <NLayout nativeScrollbar={false}>
            <RouterView />
          </NLayout>
        </NLayout>
      </NLayout>
    </>
  )
})
