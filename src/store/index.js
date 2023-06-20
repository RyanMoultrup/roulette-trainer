import { createStore, createLogger } from 'vuex';
import strategy from './modules/stragtegy';
import simulation from './modules/simulation';
import bank from './modules/bank';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        strategy,
        simulation,
        bank
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
