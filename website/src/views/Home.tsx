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

import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NButton } from "naive-ui"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent(() => {
  const router = useRouter()

  const session = useSessionStore()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.peopleController.findPeople({ id: session.id! }),
    enabled: session.id !== undefined
  })

  return () => (
    <div class="h-screen flex flex justify-around items-center">
      {data.value?.role.name != "student" && (
        <NButton class="w-32 h-32 text-2xl" type="info" onClick={() => router.push({ name: "exam-manager" })}>
          考试管理
        </NButton>
      )}

      <NButton class="w-32 h-32 text-2xl" type="info" onClick={() => router.push({ name: "paper-list" })}>
        开始考试
      </NButton>
    </div>
  )
})
