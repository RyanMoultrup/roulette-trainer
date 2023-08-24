import { user as User } from '@/api'
import { getUserIdFromToken } from "@/lib/storage/auth/TokenStorage";
import { reactive } from "vue";

const state = () => ({
    isAuthenticated: false,
    user: {
        username: '',
        _id: ''
    }
});

const mutations = {
    authenticate (state) {
        state.isAuthenticated = true
    },
    setUser (state, user) {
        state.user = reactive({ ...user })
    },
    clear (state) {
        state.isAuthenticated = false
        state.user = {
            username: '',
            _id: ''
        }
    }
}

const actions = {
    authenticate ({ commit }) {
        commit('authenticate')
    },
    async setUserFromToken ({ dispatch }) {
        const userId = getUserIdFromToken()
        await dispatch('setUser', userId)
    },
    async setUser ({ commit, state }, userId) {
        try {
            if (!state.isAuthenticated) {
                const { data: { data: user } } = await User.get(userId)
                await commit('setUser', user)
                await commit('authenticate')
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
    getUsername: state => state.user?.username
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
