const state = () => ({
  balance: 100,
  available: 100
});

const mutations = {
  add (state, number) {
    state.balance = state.balance + number;
  },
  subtract (state, number) {
    if (state.balance - number > 0) {
      state.balance = state.balance - number;
    }
  },
  reduceAvailableBalance (state, amount) {
    state.available = state.available - +amount;
  },
  increaseAvailableBalance (state, amount) {
    state.available = state.available + amount;
  },
  depositWinnings (state, amount) {
    this.add(state, amount);
    this.increaseAvailableBalance(state, amount);
  }
}

const actions = {
  deposit ({ commit }, number) {
    commit('add', number);
  }
}

const getters = {
  balance (state) {
    return state.balance;
  },
  availableBalance (state) {
    return state.available;
  },
  canBet: state => amount => {
    return (state.available - amount) >= 0;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
