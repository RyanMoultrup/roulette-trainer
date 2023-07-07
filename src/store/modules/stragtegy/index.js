import Bet from '../../../lib/table/Bet';

let currentBetSpots = [];

const state = () => ({
    strategy: {},
    lastBets: {}
});

const removeFromCurrentBets = function (value) {
    let index = currentBetSpots.indexOf(value);
    if (index > -1) {
        currentBetSpots.splice(index, 1);
    }
}

const mutations = {
    /**
     * @param state
     * @param bet {placement: string, chip: object}
     */
    async placeBet (state, bet) {
        console.log('the BET:::', bet);
        if (currentBetSpots.includes(bet.placement)) {
            await state.strategy[bet.placement].addChip(bet.chip);
            return;
        }

        currentBetSpots.push(bet.placement);
        state.strategy[bet.placement] = new Bet(bet);
    },
    removeBet (state, placement) {
        removeFromCurrentBets(placement);
        if (!state.emittingSpins) {
            state.strategy[placement].removeChips();
        }
        delete state.strategy[placement];
    },
    removeChip (state, placement, chipIndex) {
        state.strategy[placement].removeChip(chipIndex);
    },
    replayBet (state, bets) {
        state.strategy = bets;
    },
    lastBet (state, bets) {
      state.lastBets = bets;
    },
    clear (state) {
        // currentBetSpots = [];
        state.strategy = {};
    },
    reset (state) {
        state.strategy = {};
        state.lastBets = {};
        currentBetSpots = [];
    }
}

const actions = {
    setLastBet ({ commit }, bets) {
        commit('lastBet', bets);
    },
    async replayBet ({ commit, state, rootGetters }) {
        let totalBetAmount = 0;

        for (const placement in state.lastBets) {
            if (state.lastBets.hasOwnProperty(placement)) {
                totalBetAmount += state.lastBets[placement].amount;
            }
        }

        if (totalBetAmount < rootGetters['bank/balance']) {
            for (const placement in state.lastBets) {
                if (state.lastBets.hasOwnProperty(placement)) {
                    state.lastBets[placement].replaceBet();
                }
            }

            await commit('replayBet', { ...state.lastBets })
            currentBetSpots = Object.keys(state.lastBets);
            return true;
        }

        return false;
    },
    async doubleBet ({ commit, state, rootGetters }) {
        let totalBetAmount = 0;

        for (const placement in state.strategy) {
            if (state.strategy.hasOwnProperty(placement)) {
                totalBetAmount += state.strategy[placement].amount;
            }
        }

        if (totalBetAmount < rootGetters['bank/availableBalance']) {
            for (const placement in state.strategy) {
                if (state.strategy.hasOwnProperty(placement)) {
                    state.strategy[placement].chips.forEach(chip => {
                        console.log('chip:::', chip);
                        commit('placeBet', { placement, chip });
                    });
                }
            }

            return true;
        }
        console.log('return false');
        return false;
    },
    async clear ({ dispatch, commit, state }) {
        return new Promise(async (resolve, reject) => {
            currentBetSpots = [];
            await dispatch('setLastBet', state.strategy);
            commit('clear');
            resolve();
        })
    },
    async clearAll ({ commit, state }) {
        for (const bet in state.strategy) {
            await commit('removeBet', bet);
        }
    },
    reset ({ commit }) {
        commit('reset');
    }
}

// TODO: find out why this is firing so many times for each action taken in app
const getters = {
    getStrategy (state) {
        return Object.values(state.strategy);
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
