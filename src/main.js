import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import Toast, { POSITION } from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import "vue-toastification/dist/index.css";
import './styles/dc.css';
import './styles/app.css';
import './assets/main.css';
import './styles/wheel.less';

library.add(faUserSecret);

const app = createApp(App);

app.use(store);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    transition: "Vue-Toastification__fade",
});
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
