const state = () => ({
    tableLimit: true,
    maxOutside: 200,
    maxInside: 30,
    minOutside: 10,
    minInside: 10,
    realTime: false,
    timeAtTable: null,
    timePerSpin: null
});

const mutations = {
    tableLimit (state, value) {
        state.tableLimit = value;
    },
    maxOutside (state, value) {
        state.maxOutside = value;
    },
    maxInside (state, value) {
        state.maxInside = value
    },
    minOutside (state, value) {
        state.minOutside = value;
    },
    minInside (state, value) {
        state.minInside = value
    },
    realTime (state, value) {
        state.realTime = value;
    },
    timeAtTable (state, value) {
        state.timeAtTable = value;
    },
    timePerSpin (state, value) {
        state.timePerSpin = value;
    }
}

const actions = {
    setTableLimit ({ commit }, value) {
        return commit('tableLimit', value);
    },
    setMaxOutside ({ commit }, value) {
        return commit('maxOutside', value);
    },
    setMaxInside ({ commit }, value) {
        return commit('maxInside', value);
    },
    setMinOutside ({ commit }, value) {
        return commit('minOutside', value);
    },
    setMinInside ({ commit }, value) {
        return commit('minInside', value);
    },
    setRealTime ({ commit }, value) {
        return commit('realTime', value);
    },
    setTimeAtTable ({ commit }, value) {
        return commit('timeAtTable', value);
    },
    setTimePerSpin ({ commit }, value) {
        return commit('timePerSpin', value);
    }
}

const getters = {
    hasTableLimit (state) {
        return state.tableLimit;
    },
    getMaxOutside (state) {
        return state.maxOutside;
    },
    getMaxInside (state) {
        return state.maxInside;
    },
    getMinOutside (state) {
        return state.minOutside;
    },
    getMinInside (state) {
        return state.minInside;
    },
    hasRealTime (state) {
        return state.realTime;
    },
    getTimeAtTable (state) {
        return state.timeAtTable;
    },
    getTimePerSpin (state) {
        return state.timePerSpin;
    },
    getBetLimits (state) {
        return {
            maxInside: state.maxInside,
            maxOutside: state.maxOutside,
            minInside: state.minInside,
            minOutside: state.minOutside
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
