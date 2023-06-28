import game from '@/lib/game';
import crossfilter from 'crossfilter2';

const cxf = crossfilter();

const state = () => ({
  game: {},
  outcomes: cxf,
  spins: [],
  spin: null,
  rounds: 0,
  emittingSpins: false
});

const mutations = {
  pushSpin (state, number) {
    state.spin = number;
    state.rounds++;
  },
  addOutcome (state, outcome) {
    state.outcomes.add([outcome]);
    console.log('state outcomes::::', state.outcomes.all());
  },
  updateSpinEmit (state, value) {
    state.emittingSpins = value;
  }
}

const actions = {
  async play ({ commit }, hit) {
    await game.play(hit);
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
  },
  isEmitting (state) {
    return state.emittingSpins;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
