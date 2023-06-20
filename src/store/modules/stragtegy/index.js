import Bet from '../../../lib/table/Bet';

let currentBetSpots = [];

const state = () => ({
    strategy: {}
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
        console.log('placeBet bet:::', bet);
        if (currentBetSpots.includes(bet.placement)) {
            await state.strategy[bet.placement].addChip(bet.chip);
            return;
        }

        currentBetSpots.push(bet.placement)
        state.strategy[bet.placement] = new Bet(bet);
    },
    removeBet (state, placement) {
        removeFromCurrentBets(placement);
        delete state.strategy[placement];
    },
    removeChip (state, placement, chipIndex) {
        state.strategy[placement].removeChip(chipIndex);
    }
}

const getters = {
    getStrategy (state) {
        console.log('getStartegy() state:::', state);
        return Object.values(state.strategy);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
