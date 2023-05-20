import type { RequestOf } from "@/__generated"
import type { PaperInput, QuestionInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSpin,
  type FormInst,
  useMessage,
  NPagination,
  NTimePicker,
  NInputNumber
} from "naive-ui"
import type { TableColumn } from "naive-ui/es/data-table/src/interface"
import { defineComponent, reactive, ref } from "vue"
import { useImmer as useImmer } from "@/hooks/useImmer"
import dayjs from "dayjs"
import PaperForm from "@/components/PaperForm"

export default defineComponent(() => {
  const showPaper = ref<PaperInput | null>(null)

  const message = useMessage()

  const columns: TableColumn[] = [
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
      title: "用时",
      key: "expired"
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
        <NButton type="primary" size="tiny" onClick={() => (showPaper.value = { ...row })}>
          修改
        </NButton>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.paperController.findPapers>>({})

  const { data } = useQuery({
    queryKey: ["question", options],
    queryFn: () => api.paperController.findPapers(options.value)
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
                    draft.paperInput = { title: searchTitle.value }
                  })
                }}
              >
                搜索
              </NButton>
            </div>
            <NButton type="primary" onClick={() => (showPaper.value = {})}>
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
        <NModal preset="dialog" show={showPaper.value != null} onClose={() => (showPaper.value = null)}>
          {showPaper.value && <PaperForm paper={showPaper.value} />}
        </NModal>
      </>
    )
})
