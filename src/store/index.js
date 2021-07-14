import { createStore, createLogger } from 'vuex';
import strategy from './modules/strategy';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        strategy
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
