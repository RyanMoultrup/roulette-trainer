import game from '@/lib/game';
import crossfilter from 'crossfilter2';
// import {reactive, triggerRef} from "vue";

const cxf = crossfilter();
cxf.onChange(event => {
  console.log('onChange event:::', event);
})

const state = () => ({
  game: {},
  outcomes: cxf,
  spins: [],
  spin: null,
  rounds: 0
});

const mutations = {
  pushSpin(state, number) {
    state.spin = number;
    state.rounds++;
  },
  addOutcome(state, outcome) {
    state.outcomes.add([outcome]);
  }
}

const actions = {
  async play({ commit }, hit) {
    await game.play(hit);
    commit('pushSpin', hit);
  }
}

const getters = {
  getOutcomes(state) {
    console.log('getOutcomes:::', state);
    return state.outcomes;
  },
  getSpin(state) {
    return state.spin;
  },
  getSpinHistory(state) {
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
