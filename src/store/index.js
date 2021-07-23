import { createStore, createLogger } from 'vuex';
import strategy from './modules/stragtegy';
import simulation from './modules/simulation';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        strategy,
        simulation
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
