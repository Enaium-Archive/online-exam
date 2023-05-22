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

import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import { useImmer } from "@/hooks/useImmer"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NList, NListItem, NPagination, NSpin } from "naive-ui"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent(() => {
  const router = useRouter()

  const session = useSessionStore()

  const [options, setOptions] = useImmer<RequestOf<typeof api.examController.findExams>>({ peopleId: session.id! })

  const { data } = useQuery({
    queryKey: ["examList", options],
    queryFn: () => api.examController.findExams(options.value)
  })

  return () =>
    !data.value ? (
      <NSpin />
    ) : (
      <div class="flex justify-center">
        <NList
          class="w-256"
          bordered
          v-slots={{
            header: () => <div class="flex justify-center text-2xl">考试记录</div>,
            default: () =>
              data.value.content.map((exam) => (
                <NListItem key={exam.id}>
                  <div class="flex justify-between items-center">
                    <div>{exam.paper.title}</div>
                    {exam.marked ? (
                      <NButton type="info" onClick={() => router.push({ name: "marked", params: { examId: exam.id } })}>
                        已批改
                      </NButton>
                    ) : exam.submitted ? (
                      <NButton type="error" ghost disabled>
                        已交卷
                      </NButton>
                    ) : exam.expired ? (
                      <NButton type="error" ghost disabled>
                        已过期
                      </NButton>
                    ) : (
                      <NButton
                        type="primary"
                        onClick={() => router.push({ name: "answering", params: { examId: exam.id } })}
                      >
                        继续答题
                      </NButton>
                    )}
                  </div>
                </NListItem>
              )),
            footer: () => (
              <div class="flex flex-row-reverse">
                <NPagination
                  showSizePicker
                  pageSize={data.value?.size}
                  page={data.value?.number + 1}
                  pageCount={data.value?.totalPages}
                  pageSizes={[10, 20, 30, 40]}
                  onUpdatePage={(page: number) => {
                    setOptions((draft) => {
                      draft.page = page - 1
                    })
                  }}
                  onUpdatePageSize={(pageSize: number) => {
                    setOptions((draft) => {
                      draft.size = pageSize
                      draft.page = 0
                    })
                  }}
                />
              </div>
            )
          }}
        />
      </div>
    )
})
