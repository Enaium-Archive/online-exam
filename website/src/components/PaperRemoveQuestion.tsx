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
import type { PaperDto, QuestionDto } from "@/__generated/model/dto"
import { api } from "@/common/ApiInstance"
import { useImmer } from "@/hooks/useImmer"
import { useQuery } from "@tanstack/vue-query"
import { NCard, NDataTable, NForm, NFormItem, NPagination, NSpin, type FormInst, NButton, useMessage } from "naive-ui"
import type { TableColumn } from "naive-ui/es/data-table/src/interface"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent(
  (props: { paper: PaperDto["DEFAULT"] }) => {
    const message = useMessage()

    const columns: TableColumn<QuestionDto["DEFAULT"]>[] = [
      {
        type: "selection"
      },
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
      }
    ]

    const form = reactive<{
      questionIds?: number[]
    }>({})

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (errors) return
        api.paperController
          .removeQuestions({ paperId: props.paper.id, questionIds: form.questionIds! })
          .then(() => {
            message.success("移除成功")
          })
          .catch((error) => {
            message.error(error)
          })
      })
    }

    const [options, setOptions] = useImmer<RequestOf<typeof api.paperController.findIncludeQuestions>>({
      paperId: props.paper.id
    })

    const { data } = useQuery({
      queryKey: ["paper", options],
      queryFn: () => api.paperController.findIncludeQuestions(options.value)
    })

    return () =>
      !data.value ? (
        <NSpin />
      ) : (
        <>
          <NCard title={`为试卷${props.paper.title}移除题目`}>
            <NForm model={form} ref={formRef}>
              <NFormItem path="questionIds" rule={[{ required: true, message: "请选择一个题目" }]}>
                <NDataTable
                  columns={columns}
                  data={data.value.content as []}
                  rowKey={(row) => row.id}
                  onCheckedRowKeysChange={(value) => {
                    form.questionIds = value as []
                  }}
                />
              </NFormItem>
              <div class="flex flex-row-reverse">
                <NButton type="error" onClick={submit}>
                  移除
                </NButton>
              </div>
            </NForm>
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
        </>
      )
  },
  { props: ["paper"] }
)
