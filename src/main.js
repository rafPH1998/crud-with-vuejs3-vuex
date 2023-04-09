import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
import axios from 'axios'
import { URL_API } from './configs/api'
import { createStore } from 'vuex'
import store from './store'

axios.defaults.baseURL = URL_API

const app = createApp(App)
app.use(router)

const vuexStore = createStore(store)
app.use(vuexStore)

app.mount('#app')