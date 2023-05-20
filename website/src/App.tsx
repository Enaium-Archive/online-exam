import { NConfigProvider, NMessageProvider, zhCN } from "naive-ui"
import { defineComponent } from "vue"

import { RouterView } from "vue-router"
export default defineComponent(() => {
  return () => (
    <>
      <NConfigProvider locale={zhCN}>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </NConfigProvider>
    </>
  )
})
