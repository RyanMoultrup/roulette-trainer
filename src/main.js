import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from './store/index'
import Toast, { POSITION } from "vue-toastification"
import Default from '@/views/layouts/Default.vue'
import Blank from '@/views/layouts/Blank.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './lib/fontawesome'
import "vue-toastification/dist/index.css"
import './styles/dc.css'
import './styles/app.css'
import './assets/main.css'
import isMobile from "@/lib/mobile-check"

const app = createApp(App)

app.provide('isMobile', isMobile())

app.use(router)
app.use(store)
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    transition: "Vue-Toastification__fade",
    containerClassName: 'main-message-toast'
})

app.component('font-awesome-icon', FontAwesomeIcon)

app.component('default', Default);
app.component('blank', Blank);

app.mount('#app')
