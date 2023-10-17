import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import axios from "axios";
import App from "./App.vue";
import "./assets/css/main.css";

axios.defaults.baseURL = "http://localhost:8081";

createApp(App).use(createPinia()).use(router).mount("#app");
