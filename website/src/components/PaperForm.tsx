/*
 * This is a simple examination system
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
