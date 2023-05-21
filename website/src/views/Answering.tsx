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
