import game from '@/lib/game'
import crossfilter from 'crossfilter2'

const cxf = crossfilter();

const state = () => ({
  game: {},
  outcomes: cxf,
  spins: [],
  spin: null,
  rounds: 0,
  selectedChip: {
    color: 'darkred',
    value: '5'
  },
  emittingSpins: false
});

const mutations = {
  pushSpin (state, number) {
    state.spin = number
    state.rounds++
  },
  addOutcome (state, outcome) {
    state.outcomes.add(outcome)
  },
  updateSpinEmit (state, value) {
    state.emittingSpins = value
  },
  reset (state) {
    cxf.remove();
    state.game = {}
    state.outcomes = cxf
    state.spins = []
    state.rounds = 0
    state.emittingSpins = false
    state.selectedChip = {
      color: 'darkred',
      value: '5'
    }
  },
  updateSelectedChip (state, chip) {
    state.selectedChip = chip
  }
}

const actions = {
  async play ({ commit }, hit) {
    await game.play(hit);
    commit('pushSpin', hit)
  },
  reset ({ commit }) {
    commit('reset')
  }
}

const getters = {
  getOutcomes: state => state.outcomes,
  isEmitting: state => state.emittingSpins,
  selectedChip: state => state.selectedChip
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
