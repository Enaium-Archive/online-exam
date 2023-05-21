import { NLayout, NLayoutHeader, NMenu, type MenuOption } from "naive-ui"
import { defineComponent } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to={{ name: "paper-list" }}>试卷</RouterLink>,
    key: "paper-list"
  },
  {
    label: () => <RouterLink to={{ name: "exam-list" }}>考试记录</RouterLink>,
    key: "exam-list"
  }
]

export default defineComponent(() => {
  const route = useRoute()

  return () => (
    <>
      <NLayout class={"h-screen"}>
        <NLayoutHeader class={"h-16 flex justify-center items-center"} bordered>
          <NMenu options={menuOptions} mode="horizontal" value={route.name as string} />
        </NLayoutHeader>
        <NLayout style={{ top: "64px" }} position={"absolute"} hasSider>
          <NLayout nativeScrollbar={false}>
            <RouterView />
          </NLayout>
        </NLayout>
      </NLayout>
    </>
  )
})
