import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import './styles/dc.css';
import './styles/app.css';
import './assets/main.css';
// import './assets/tailwind.css';
import './styles/wheel.less';
import * as dc from 'dc';

console.log("DC:::::::::::::::::::::::::", dc.chartRegistry);

// dc.spinHistoryTable = function (parent, chartGroup) {
//     let _chart = dc.baseMixin({});
//
//     _chart._doRender = function () {
//         // do nothing
//     }
//
//     _chart._doRedraw = function () {
//         return _chart._doRender();
//     }
//
//     return _chart.anchor(parent, chartGroup);
// }



const app = createApp(App);

app.use(store);
console.log('after app.use(store)==============');
app.mount('#app');
