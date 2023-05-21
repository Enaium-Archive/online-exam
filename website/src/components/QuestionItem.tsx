import type { QuestionDto } from "@/__generated/model/dto"
import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NCheckbox, NCheckboxGroup, NInput, NRadio, NRadioGroup, NSelect, useMessage } from "naive-ui"
import { defineComponent, ref, watch } from "vue"

export default defineComponent(
  (props: { question: QuestionDto["DEFAULT"]; examId: number }) => {
    const message = useMessage()

    const session = useSessionStore()

    const answer = ref()

    const { data } = useQuery({
      queryKey: ["answer", props.question.id],
      queryFn: () => api.answerController.findAnswer({ examId: props.examId, questionsId: props.question.id })
    })

    watch(
      () => data.value,
      () => {
        if (data.value) {
          changeValue(data.value.answer)
        }
      }
    )

    const change = (v: any) => {
      window.setTimeout(() => {
        api.answerController
          .saveAnswer({
            body: {
              answer: v.toString(),
              questionId: props.question.id,
              peopleId: session.id!,
              examId: props.examId
            }
          })
          .then(() => {
            changeValue(v)
          })
          .catch((error) => {
            message.error(error)
          })
      }, 1000) //debounce
    }

    const changeValue = (v: any) => {
      switch (props.question.type) {
        case "SINGLE":
          answer.value = v
          break
        case "MULTI":
          answer.value = typeof v === "string" ? v.split(",") : v
          break
        case "JUDGMENT":
          answer.value = Boolean(v)
          break
        case "FILL":
          answer.value = v
      }
    }

    return () => (
      <div>
        {props.question.type === "SINGLE" ? (
          <div>单选</div>
        ) : props.question.type === "MULTI" ? (
          <div>多选</div>
        ) : props.question.type === "JUDGMENT" ? (
          <div>判断</div>
        ) : props.question.type === "FILL" ? (
          <div>填空</div>
        ) : (
          <div></div>
        )}
        <div class="text-2xl">{props.question.title}</div>
        {props.question.type === "SINGLE" ? (
          <NRadioGroup value={answer.value} onUpdateValue={(v) => change(v)}>
            <NRadio value="A">A</NRadio>
            <NRadio value="B">B</NRadio>
            <NRadio value="C">C</NRadio>
            <NRadio value="D">D</NRadio>
          </NRadioGroup>
        ) : props.question.type === "MULTI" ? (
          <NCheckboxGroup value={answer.value} onUpdateValue={(v) => change(v)}>
            <NCheckbox value="A">A</NCheckbox>
            <NCheckbox value="B">B</NCheckbox>
            <NCheckbox value="C">C</NCheckbox>
            <NCheckbox value="D">D</NCheckbox>
          </NCheckboxGroup>
        ) : props.question.type === "JUDGMENT" ? (
          <NRadioGroup value={answer.value} onUpdateValue={(v) => change(v)}>
            <NRadio value={true}>√</NRadio>
            <NRadio value={false}>×</NRadio>
          </NRadioGroup>
        ) : props.question.type === "FILL" ? (
          <NInput value={answer.value} type="textarea" onUpdateValue={(v) => change(v)} />
        ) : (
          <div></div>
        )}
      </div>
    )
  },
  {
    props: ["question", "examId"]
  }
)
