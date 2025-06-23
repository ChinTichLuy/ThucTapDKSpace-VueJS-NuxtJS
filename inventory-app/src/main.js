import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { autoSavePlugin } from './stores/plugins'
import router from './router'
import './assets/tailwind.css'

const pinia = createPinia()
pinia.use(autoSavePlugin)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
