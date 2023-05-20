import "virtual:windi.css"

import { createApp } from "vue"
import App from "@/App"
import store from "@/store"
import router from "@/router"

import { VueQueryPlugin } from "@tanstack/vue-query"

const app = createApp(<App />)

app.use(store)

app.use(VueQueryPlugin)

app.use(router)

app.mount("#app")
