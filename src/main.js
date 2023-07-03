import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import './styles/dc.css';
import './styles/app.css';
import './assets/main.css';
import './styles/wheel.less';

const app = createApp(App);

app.use(store);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    transition: "Vue-Toastification__fade",
});
app.mount('#app');
