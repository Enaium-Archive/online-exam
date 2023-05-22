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
import { useQuery } from "@tanstack/vue-query"
import { NList, NListItem, NPagination, NSpin } from "naive-ui"
import { defineComponent } from "vue"
import { useRoute } from "vue-router"

export default defineComponent(() => {
  const route = useRoute()

  const [options, setOptions] = useImmer<RequestOf<typeof api.questionController.findAnswers>>({
    examId: Number(route.params.examId)
  })

  const { data } = useQuery({
    queryKey: ["marking", options],
    queryFn: () => api.questionController.findAnswers(options.value)
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
            header: () => <div class="flex justify-center text-2xl">结果</div>,
            default: () =>
              data.value.content.map((qa, index) => (
                <NListItem key={index}>
                  <div>题目:{qa.question.title}</div>
                  {qa.answer ? (
                    <div>
                      <div>答案:{qa.answer.answer}</div>
                      <div>状态:{qa.answer.state ? "√" : "×"}</div>
                      <div>原因:{qa.answer.reason}</div>
                    </div>
                  ) : (
                    <div>未作答</div>
                  )}
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
