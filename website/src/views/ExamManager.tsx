import type { RequestOf } from "@/__generated"
import type { ExamDto } from "@/__generated/model/dto"
import { api } from "@/common/ApiInstance"
import { useImmer } from "@/hooks/useImmer"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NCard, NDataTable, NPagination, NSpin } from "naive-ui"
import type { TableColumn } from "naive-ui/es/data-table/src/interface"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent(() => {
  const router = useRouter()

  const columns: TableColumn<ExamDto["ExamController/COMPLETE_EXAM"]>[] = [
    {
      title: "序号",
      key: "id"
    },
    {
      title: "试卷",
      key: "paper.title",
      width: 600
    },
    {
      title: "考生",
      key: "people.username"
    },
    {
      title: "开始时间",
      key: "startTime"
    },
    {
      title: "过期",
      key: "expired",
      render: (row) => (row.expired ? "已过期" : "未过期")
    },
    {
      title: "提交",
      key: "submitted",
      render: (row) => (row.submitted ? "已提交" : "未提交")
    },
    {
      title: "阅卷",
      key: "marked",
      render: (row) => (row.marked ? "已阅卷" : "未阅卷")
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <NButton type="warning" onClick={() => router.push({ name: "marking", params: { examId: row.id } })}>
          阅卷
        </NButton>
      )
    }
  ]

  const [options, setOptions] = useImmer<RequestOf<typeof api.examController.findComplexExams>>({})

  const { data } = useQuery({
    queryKey: ["examManager", options],
    queryFn: () => api.examController.findComplexExams(options.value)
  })

  return () =>
    !data.value ? (
      <NSpin />
    ) : (
      <>
        <NCard title="考试记录">
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
      </>
    )
})
