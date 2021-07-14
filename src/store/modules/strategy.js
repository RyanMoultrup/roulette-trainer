const state = () => ({
    strategy: {}
});

const mutations = {
    add (state, bet) {
        state.unshift(bet);
    }
}

const getters = {
    getStrategy (state) {
        return state.strategy;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
