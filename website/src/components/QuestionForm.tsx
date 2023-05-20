import type { QuestionInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { NButton, NForm, NFormItem, NInput, NSelect, type FormInst, useMessage, type SelectOption } from "naive-ui"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent(
  (props: { question: QuestionInput }) => {
    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (errors) return
        api.questionController
          .saveQuestion({ body: props.question })
          .then(() => {
            message.success("添加成功")
          })
          .catch((error) => {
            message.error(error)
          })
      })
    }

    const selectOptions: SelectOption[] = [
      {
        label: "单选",
        value: "SINGLE"
      },
      {
        label: "多选",
        value: "MULTI"
      },
      {
        label: "判断",
        value: "JUDGMENT"
      },
      {
        label: "填空",
        value: "FILL"
      }
    ]

    return () => (
      <NForm model={props.question} ref={formRef}>
        <NFormItem path="title" label="题目" rule={[{ required: true, message: "请输入题目" }]}>
          <NInput type="textarea" v-model:value={props.question.title} />
        </NFormItem>
        <NFormItem path="type" label="类型" rule={[{ required: true, message: "请选择类型" }]}>
          <NSelect options={selectOptions} v-model:value={props.question.type} />
        </NFormItem>
        <div class="flex flex-row-reverse">
          <NButton type="info" onClick={submit}>
            添加
          </NButton>
        </div>
      </NForm>
    )
  },
  {
    props: ["question"]
  }
)
