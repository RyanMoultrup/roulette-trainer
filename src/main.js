import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import './styles/dc.css';
import './styles/app.css';
import './assets/tailwind.css';
import './styles/wheel.less';

const app = createApp(App);

app.use(store);
app.mount('#app');
