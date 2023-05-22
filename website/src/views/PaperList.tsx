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
import { NButton, NList, NListItem, NPagination, NPopconfirm, NSpin, useMessage } from "naive-ui"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent(() => {
  const router = useRouter()

  const message = useMessage()

  const session = useSessionStore()

  const [options, setOptions] = useImmer<RequestOf<typeof api.paperController.findPapers>>({})

  const { data } = useQuery({
    queryKey: ["paperList", options],
    queryFn: () => api.paperController.findPapers(options.value)
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
            header: () => <div class="flex justify-center text-2xl">所有试卷</div>,
            default: () =>
              data.value.content.map((paper) => (
                <NListItem key={paper.id}>
                  <div class="flex justify-between items-center">
                    <div>{paper.title}</div>
                    <div>用时:{paper.expired}(秒)</div>
                    <NPopconfirm
                      v-slots={{
                        trigger: () => <NButton type="primary">开始考试</NButton>,
                        default: () => <div>确定要开始考试吗</div>
                      }}
                      onPositiveClick={() => {
                        api.examController
                          .startExam({ peopleId: session.id!, paperId: paper.id })
                          .then((exam) => {
                            router.push({ name: "answering", params: { examId: exam.id } })
                          })
                          .catch((error) => {
                            message.error(error)
                          })
                      }}
                    />
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
