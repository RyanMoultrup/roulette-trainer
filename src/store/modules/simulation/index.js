const state = () => ({
    game: {},
    outcomes: [],
    spins: [],
    spin: null,
    rounds: 0
});

const mutations = {
    pushSpin (state, number) {
        console.log('pushSpin*****', number);
        console.log('state*****', state);
        state.spin = number;
        state.rounds++;
        // state.spins.unshift(number);
    }
}

const getters = {
    getOutcomes (state) {
        return state.outcomes;
    },
    getSpin (state) {
        return state.spin;
    },
    getSpinHistory (state) {
        return state.spins;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
