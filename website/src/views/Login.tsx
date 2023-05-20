import { defineComponent, reactive, ref } from "vue"
import { NForm, NFormItem, NInput, type FormInst, NButton, useMessage, NCard } from "naive-ui"
import { api } from "@/common/ApiInstance"
import type { PeopleInput } from "@/__generated/model/static"
import { useSessionStore } from "@/store"

export default defineComponent(() => {
  const message = useMessage()

  const form = reactive<PeopleInput>({})

  const formRef = ref<FormInst | null>(null)

  const submit = () => {
    formRef.value?.validate((errors) => {
      if (errors) return
      api.sessionController
        .login({ body: form })
        .then((data) => {
          const sessionStore = useSessionStore()
          sessionStore.id = data.id
          sessionStore.token = data.token
          message.success("登录成功")
        })
        .catch((error) => {
          message.error(error)
        })
    })
  }

  return () => (
    <div class={"h-screen flex justify-center items-center"}>
      <NCard title="考试系统" class={"w-128"}>
        <NForm model={form} ref={formRef}>
          <NFormItem path="username" label="账号" rule={[{ required: true, message: "请输入你的账号" }]}>
            <NInput v-model:value={form.username} />
          </NFormItem>
          <NFormItem path="password" label="密码" rule={[{ required: true, message: "请输入你的密码" }]}>
            <NInput v-model:value={form.password} />
          </NFormItem>
          <NButton type="primary" onClick={submit}>
            登录
          </NButton>
        </NForm>
      </NCard>
    </div>
  )
})
