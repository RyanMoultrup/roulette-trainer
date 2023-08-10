const state = () => ({
    isAuthenticated: false
});

const mutations = {
    authenticate (state) {
        state.isAuthenticated = true
    }
}

const actions = {
    authenticate ({ commit }) {
        commit('reset');
    },
}

const getters = {
    isAuthenticated: () => state.isAuthenticated
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
