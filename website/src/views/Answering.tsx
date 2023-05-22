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
import QuestionItem from "@/components/QuestionItem"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NList, NListItem, NPopconfirm, NSpin, useMessage } from "naive-ui"
import { defineComponent } from "vue"
import { useRoute, useRouter } from "vue-router"

export default defineComponent(() => {
  const route = useRoute()
  const router = useRouter()

  const message = useMessage()

  const { data } = useQuery({
    queryKey: ["answering"],
    queryFn: () => api.examController.findQuestions({ examId: Number(route.params.examId) })
  })

  return () =>
    !data.value ? (
      <NSpin />
    ) : (
      <div class="flex justify-center">
        <div class="container">
          <NList
            bordered
            v-slots={{
              default: () =>
                data.value.map((question) => {
                  return (
                    <NListItem key={question.id}>
                      <QuestionItem question={question} examId={Number(route.params.examId)} />
                    </NListItem>
                  )
                }),
              footer: () => (
                <div class="flex flex-row-reverse">
                  <NPopconfirm
                    v-slots={{
                      trigger: () => <NButton type="primary">提交试卷</NButton>,
                      default: () => <div>确定要提交试卷吗</div>
                    }}
                    onPositiveClick={() => {
                      api.examController.submitted({ examId: Number(route.params.examId) }).then(() => {
                        message.success("提交成功")
                        router.push({ name: "exam-list" })
                      })
                    }}
                  />
                </div>
              )
            }}
          />
        </div>
      </div>
    )
})
