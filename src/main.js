import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081'

// const pinia = createPinia()
// const app = createApp(App);
// app.use(pinia)
// app.mount('#app')

createApp(App)
.use(createPinia())
.mount('#app');