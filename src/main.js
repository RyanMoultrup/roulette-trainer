import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import Toast, { POSITION } from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core';
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
    faChartColumn
} from '@fortawesome/free-solid-svg-icons'
import "vue-toastification/dist/index.css";
import './styles/dc.css';
import './styles/app.css';
import './assets/main.css';
import './styles/wheel.less';

library.add(
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
    faChartColumn
);

const app = createApp(App);

app.use(store);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    transition: "Vue-Toastification__fade",
    containerClassName: 'main-message-toast'
});
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
