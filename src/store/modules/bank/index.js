const state = () => ({
  startBalance: 1000,
  balance: 1000,
  available: 1000
});

const mutations = {
  reduceAvailableBalance (state, amount) {
    state.available = state.available - +amount;
  },
  increaseAvailableBalance (state, amount) {
    state.available = state.available + amount;
  },
  reset (state) {
    state.balance = state.startBalance;
    state.available = state.startBalance;
  },
  updateBank (state, amount) {
    state.balance = amount;
    state.available = amount;
  },
  updateStartBalance(state, value) {
    state.startBalance = value;
  }
}

const actions = {
  reset ({ commit }) {
    commit('reset');
  },
  updateStartBalance ({ commit }, value) {
    commit('updateStartBalance', value);
    commit('reset');
  }
}

const getters = {
  startBalance (state) {
    return state.startBalance;
  },
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
