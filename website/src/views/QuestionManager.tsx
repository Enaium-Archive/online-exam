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
import type { Page, QuestionInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import {
  NButton,
  NCard,
  NDataTable,
  NInput,
  NModal,
  NSpin,
  NPagination,
  NButtonGroup,
  NSelect,
  type SelectOption
} from "naive-ui"
import type { TableColumn } from "naive-ui/es/data-table/src/interface"
import { defineComponent, ref } from "vue"
import { useImmer as useImmer } from "@/hooks/useImmer"
import QuestionForm from "@/components/QuestionForm"
import type { PaperDto, QuestionDto } from "@/__generated/model/dto"

export default defineComponent(() => {
  const showQuestion = ref<QuestionInput | null>(null)

  const columns: TableColumn<QuestionDto["DEFAULT"]>[] = [
    {
      title: "序号",
      key: "id"
    },
    {
      title: "题目",
      key: "title",
      width: 600
    },
    {
      title: "类型",
      key: "type",
      render: (row) => {
        switch (row.type) {
          case "SINGLE":
            return "单选"
          case "MULTI":
            return "多选"
          case "JUDGMENT":
            return "判断"
          case "FILL":
            return "填空"
        }
      }
    },
    {
      title: "创建时间",
      key: "createdTime"
    },
    {
      title: "修改时间",
      key: "modifiedTime"
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <NButton type="primary" size="tiny" onClick={() => (showQuestion.value = { ...row })}>
          修改
        </NButton>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.questionController.findQuestions>>({})

  const { data } = useQuery({
    queryKey: ["question", options],
    queryFn: () => api.questionController.findQuestions(options.value)
  })

  const searchTitle = ref()

  return () =>
    !data.value ? (
      <NSpin />
    ) : (
      <>
        <NCard>
          <div class="flex justify-between">
            <div class="flex gap-5">
              <NInput v-model:value={searchTitle.value} clearable />
              <NButton
                type="primary"
                onClick={() => {
                  setOptions((draft) => {
                    draft.questionInput = { title: searchTitle.value }
                  })
                }}
              >
                搜索
              </NButton>
            </div>
            <NButton type="primary" onClick={() => (showQuestion.value = {})}>
              添加
            </NButton>
          </div>
        </NCard>
        <NCard title="题目">
          <NDataTable columns={columns} data={data.value.content as []} />
          <div class="flex flex-row-reverse mt-5">
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
        </NCard>
        <NModal preset="dialog" show={showQuestion.value != null} onClose={() => (showQuestion.value = null)}>
          {showQuestion.value && <QuestionForm question={showQuestion.value} />}
        </NModal>
      </>
    )
})
