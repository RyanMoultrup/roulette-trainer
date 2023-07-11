import { createStore, createLogger } from 'vuex';
import strategy from './modules/stragtegy';
import simulation from './modules/simulation';
import bank from './modules/bank';
import settings from '@/store/modules/settings';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        strategy,
        simulation,
        bank,
        settings
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
