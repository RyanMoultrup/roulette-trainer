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
        if (currentBetSpots.includes(bet.placement)) {
            await state.strategy[bet.placement].addChip(bet.chip);
            return;
        }

        currentBetSpots.push(bet.placement)
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
    replayBet (state) {
        state.strategy = {...state.lastBets};
        console.log('state.strategy:::', state.strategy);
        for (const placement in state.strategy) {
            if (state.strategy.hasOwnProperty(placement)) {
                console.log('the bet++++++++++++++++++++++++', state.strategy[placement]);
                state.strategy[placement].replaceBet();
            }
        }
        currentBetSpots = Object.keys(state.lastBets);
        console.log('current BET Spots:::###$$$$$', currentBetSpots);
    },
    lastBet (state, bets) {
      state.lastBets = bets;
    },
    clear (state) {
        // currentBetSpots = [];
        state.strategy = {};
    }
}

const actions = {
    setLastBet ({ commit }, bets) {
        commit('lastBet', bets);
    },
    async clear ({ dispatch, commit, state }) {
        currentBetSpots = [];
        // console.log('current BET spots================', currentBetSpots);
        await dispatch('setLastBet', state.strategy);
        commit('clear');
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
