import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from './store/index'
import Toast, { POSITION } from "vue-toastification"
import { library } from '@fortawesome/fontawesome-svg-core'
import Default from '@/views/layouts/Default.vue';
import Blank from '@/views/layouts/Blank.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faGear,
    faBuildingColumns,
    faCirclePlay,
    faRotate,
    faExplosion,
    faAnglesUp,
    faRotateLeft,
    faPlus,
    faChartPie,
    faChartArea,
    faChartColumn,
    faTriangleExclamation,
    faForwardStep,
    faBackwardStep,
    faPlay,
    faPause,
    faTrophy,
    faMagnifyingGlass,
    faHouse,
    faMedal,
    faArrowUpWideShort,
    faArrowDownShortWide,
    faArrowsUpDown,
    faCircleChevronLeft,
    faCircleChevronRight,
    faGraduationCap,
    faBroom,
    faRotateRight,
    faChessKnight,
    faKeyboard,
    faFloppyDisk
} from '@fortawesome/free-solid-svg-icons'
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"
import "vue-toastification/dist/index.css"
import './styles/dc.css'
import './styles/app.css'
import './assets/main.css'
// import './styles/wheel.less'

library.add(
    faGear, faBuildingColumns,
    faCirclePlay, faRotate,
    faExplosion, faAnglesUp,
    faRotateLeft, faPlus,
    faChartPie, faChartArea,
    faChartColumn, faXmarkCircle,
    faTriangleExclamation, faFloppyDisk,
    faForwardStep, faBackwardStep, faPlay,
    faPause, faTrophy, faMagnifyingGlass,
    faHouse, faMedal, faArrowUpWideShort,
    faArrowDownShortWide, faArrowsUpDown,
    faCircleChevronLeft, faCircleChevronRight,
    faGraduationCap, faBroom, faRotateRight,
    faChessKnight, faKeyboard
)

const app = createApp(App)

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
