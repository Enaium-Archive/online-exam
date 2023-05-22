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
