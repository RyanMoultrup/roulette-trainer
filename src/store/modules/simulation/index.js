import game from '@/lib/game';
import crossfilter from 'crossfilter2';

const cxf = crossfilter();

const state = () => ({
  game: {},
  outcomes: cxf,
  spins: [],
  spin: null,
  rounds: 0,
  selectedChip: {
    color: 'red',
    value: '5'
  },
  emittingSpins: false
});

const mutations = {
  pushSpin (state, number) {
    state.spin = number;
    state.rounds++;
  },
  addOutcome (state, outcome) {
    state.outcomes.add([outcome]);
  },
  updateSpinEmit (state, value) {
    state.emittingSpins = value;
  },
  reset (state) {
    cxf.remove();
    state = {
      game: {},
      outcomes: cxf,
      spins: [],
      rounds: 0,
      emittingSpins: false
    }
  },
  updateSelectedChip (state, chip) {
    state.selectedChip = chip;
  }
}

const actions = {
  async play ({ commit }, hit) {
    await game.play(hit);
    commit('pushSpin', hit);
  },
  reset ({ commit }) {
    commit('reset');
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
  },
  selectedChip (state) {
    return state.selectedChip;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
