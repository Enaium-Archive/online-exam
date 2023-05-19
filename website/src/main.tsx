import 'virtual:windi.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App'
import store from './store'

const app = createApp(<App />)

app.use(store)


app.mount('#app')
