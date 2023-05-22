import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import MarkingItem from "@/components/MarkingItem"
import { useImmer } from "@/hooks/useImmer"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NList, NListItem, NPagination, NPopconfirm, NSpin, useMessage } from "naive-ui"
import { defineComponent } from "vue"
import { useRoute, useRouter } from "vue-router"

export default defineComponent(() => {
  const route = useRoute()
  const router = useRouter()

  const messae = useMessage()

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
      <>
        <div class="flex justify-center">
          <NList
            class="w-256"
            bordered
            v-slots={{
              header: () => <div>阅卷</div>,
              default: () =>
                data.value.content.map((qa, index) => (
                  <NListItem key={index}>
                    <MarkingItem qa={qa} />
                  </NListItem>
                )),
              footer: () => (
                <div class="flex justify-between items-center">
                  <NPopconfirm
                    v-slots={{
                      trigger: () => <NButton type="warning">完成阅卷</NButton>,
                      default: () => <div>确定要完成吗</div>
                    }}
                    onPositiveClick={() =>
                      api.examController.marked({ examId: Number(route.params.examId) }).then(() => {
                        router.push({ name: "exam-manager" })
                        messae.success("完成阅卷")
                      })
                    }
                  />
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
      </>
    )
})
