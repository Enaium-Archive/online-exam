import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store

export const useSessionStore = defineStore("session-store", {
  state: () => ({
    token: null as string | null,
    id: null as string | null,
  }),
  persist: true,
})