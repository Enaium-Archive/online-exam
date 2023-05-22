import type { QuestionDto, AnswerDto } from "@/__generated/model/dto"
import type { AnswerMarkingInput, QAResponse } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { NButton, NForm, NFormItem, NInput, NRadio, NRadioGroup, type FormInst, useMessage } from "naive-ui"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent(
  (props: {
    qa: QAResponse<QuestionDto["QuestionController/QUESTION_FETCHER"], AnswerDto["QuestionController/ANSWER_FETCHER"]>
  }) => {
    const message = useMessage()

    const form = reactive<AnswerMarkingInput>({
      id: props.qa.answer?.id,
      reason: props.qa.answer?.reason,
      state: props.qa.answer?.state
    })

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (errors) return
        api.answerController
          .makingAnswer({ body: form })
          .then(() => {
            message.success("批改成功")
          })
          .catch((error) => {
            message.error(error)
          })
      })
    }

    return () => (
      <div>
        <div>题目:{props.qa.question.title}</div>
        {props.qa.answer ? (
          <>
            <div>
              {props.qa.question.type === "JUDGMENT" ? (
                <div>答案:{props.qa.answer.answer ? "√" : "×"}</div>
              ) : (
                <div>答案:{props.qa.answer.answer}</div>
              )}
            </div>
            <div>
              <NForm model={form} ref={formRef} labelPlacement="left">
                <NFormItem label="原因" path="reason">
                  <NInput type="textarea" placeholder="请输入原因(可空)" v-model:value={form.reason} />
                </NFormItem>
                <NFormItem label="状态" path="state" rule={[{ required: true, message: "请选择状态" }]}>
                  <div class="flex items-center justify-between w-full">
                    <NRadioGroup v-model:value={form.state}>
                      <NRadio value={true}>√</NRadio>
                      <NRadio value={false}>×</NRadio>
                    </NRadioGroup>
                    <NButton type="info" onClick={submit}>
                      批改
                    </NButton>
                  </div>
                </NFormItem>
              </NForm>
            </div>
          </>
        ) : (
          <div>未作答</div>
        )}
      </div>
    )
  },
  {
    props: ["qa"]
  }
)
