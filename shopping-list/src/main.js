import { createApp } from 'vue'
import App from './App.vue'
import MainNavbar from './components/Navbar.vue'
import './assets/main.css'

const app = createApp(App)
app.component('MainNavbar', MainNavbar)
app.mount('#app')