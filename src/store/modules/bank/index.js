
import game from '@/lib/game';

const state = () => ({
  balance: 0
});

const mutations = {
  add (state, number) {
    state.balance = state.balance + number;
  },
  subtract (state, number) {
    if (state.balance - number > 0) {
      state.balance = state.balance - number;
    }
  }
}

const actions = {
  async play ({ commit }, hit) {
    await game.play(hit);
    commit('pushSpin', hit);
  },
  deposit ({ commit }, number) {
    commit('add', number);
  }
}

const getters = {
  balance (state) {
    return state.balance;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
