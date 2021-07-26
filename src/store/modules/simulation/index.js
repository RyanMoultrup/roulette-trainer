import Outcomes from '@/lib/Outcomes';
import game from '@/lib/game';

const state = () => ({
    game: {},
    outcomes: Outcomes,
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
    },
    addOutcome (state, outcome) {
        state.outcomes.add(outcome);
        console.log('Outcomes.all()', state.outcomes.all());
    }
}

const actions = {
     play ({ commit }, hit) {
        game.play(hit);
        commit('pushSpin', hit);
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
    mutations,
    actions
}
