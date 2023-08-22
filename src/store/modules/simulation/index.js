import game from '@/lib/game'
import crossfilter from 'crossfilter2'

const cxf = crossfilter();

const state = () => ({
  game: {},
  outcomes: cxf,
  filteredOutcomes: [],
  spins: [],
  spin: null,
  rounds: 0,
  selectedChip: {
    color: 'darkred',
    value: '5'
  },
  emittingSpins: false,
  mode: 'practice'
});

const mutations = {
  updateRounds (state, number) {
    state.rounds = number
  },
  updateSpin (state, number) {
    state.spin = number
  },
  pushSpin (state, number) {
    state.spin = number
    state.rounds++
  },
  addFilteredOutcomes (state, outcomes) {
    state.filteredOutcomes = outcomes
  },
  addOutcome (state, outcome) {
    // outcome.forEach(item => cxf.add([item]))
    outcome.forEach(item => state.outcomes.add([item]))
  },
  updateSpinEmit (state, value) {
    state.emittingSpins = value
  },
  updateMode (state, mode) {
    state.mode = mode
  },
  reset (state) {
    cxf.remove();
    state.game = {}
    state.outcomes = cxf
    state.filteredOutcomes = []
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
  setRound ({ commit }, number) {
    commit('updateRounds', number)
  },
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
  getFilteredOutcomes: state => state.filteredOutcomes,
  // getOutcomes: state => cxf,
  isEmitting: state => state.emittingSpins,
  selectedChip: state => state.selectedChip,
  getMode: state => state.mode,
  getRounds: state => state.rounds,
  getSpin: state => state.spin
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
