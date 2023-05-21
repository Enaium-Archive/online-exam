import { NLayout, NLayoutContent, NLayoutSider, NMenu, type MenuOption } from "naive-ui"
import { defineComponent } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to={{ name: "question-manager" }}>题目管理</RouterLink>,
    key: "question-manager"
  },
  {
    label: () => <RouterLink to={{ name: "paper-manager" }}>试卷管理</RouterLink>,
    key: "paper-manager"
  }
]

export default defineComponent(() => {
  const route = useRoute()

  return () => (
    <div>
      <NLayout hasSider>
        <NLayoutSider>
          <NMenu options={menuOptions} value={route.name as string} mode="vertical" />
        </NLayoutSider>
        <NLayout>
          <NLayoutContent>
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </div>
  )
})
