import type { PaperInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { type FormInst, NForm, NFormItem, NInput, NInputNumber, NButton, useMessage } from "naive-ui"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent(
  (props: { paper: PaperInput }) => {
    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (errors) return
        api.paperController
          .savePaper({ body: props.paper })
          .then(() => {
            message.success("添加成功")
          })
          .catch((error) => {
            message.error(error)
          })
      })
    }

    return () => (
      <NForm model={props.paper} ref={formRef}>
        <NFormItem path="title" label="题目" rule={[{ required: true, message: "请输入题目" }]}>
          <NInput type="textarea" v-model:value={props.paper.title} />
        </NFormItem>
        <NFormItem path="expired" label="用时" rule={[{ required: true, message: "请输入用时" }]}>
          <NInputNumber v-model:value={props.paper.expired} />
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
    props: ["paper"]
  }
)
