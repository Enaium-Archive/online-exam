import type { RequestOf } from "@/__generated"
import type { PaperDto, QuestionDto } from "@/__generated/model/dto"
import { api } from "@/common/ApiInstance"
import { useImmer } from "@/hooks/useImmer"
import { useQuery } from "@tanstack/vue-query"
import {
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NPagination,
  NSpin,
  NTable,
  type FormInst,
  NButton,
  useMessage,
  NInput
} from "naive-ui"
import type { TableColumn, TableColumns } from "naive-ui/es/data-table/src/interface"
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
          .addQuestions({ paperId: props.paper.id, questionIds: form.questionIds! })
          .then(() => {
            message.success("添加成功")
          })
          .catch((error) => {
            message.error(error)
          })
      })
    }

    const [options, setOptions] = useImmer<RequestOf<typeof api.paperController.findNotIncludeQuestions>>({
      paperId: props.paper.id
    })

    const { data } = useQuery({
      queryKey: ["paper", options],
      queryFn: () => api.paperController.findNotIncludeQuestions(options.value)
    })

    return () =>
      !data.value ? (
        <NSpin />
      ) : (
        <>
          <NCard title={`为试卷${props.paper.title}添加题目`}>
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
                <NButton type="primary" onClick={submit}>
                  添加
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
