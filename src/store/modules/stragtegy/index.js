import Bet from '../../../lib/table/Bet';

const currentBetSpots = [];

const state = () => ({
    strategy: {}
});

const mutations = {
    /**
     *
     * @param state
     * @param bet {placement: string, chip: object}
     */
    placeBet (state, bet) {
        console.log('state', state);
        console.log('state.strategy', state.strategy);

        if (currentBetSpots.includes(bet.placement)) {

            console.log('state.strategy[bet.placement]', state.strategy[bet.placement]);

            state.strategy[bet.placement].addChip(bet.chip);
            return;
        }

        currentBetSpots.push(bet.placement)
        state.strategy[bet.placement] = new Bet(bet);
    },
    removeBet (state, placement) {
        // state.removeBet(index);
        console.log('placement:::', placement);
        console.log('removeBet:::', state.strategy[placement]);
        delete state.strategy[placement];
    },
    updateBet (state, index, amount) {
        state.updateBet(index, amount);
    }
}

const getters = {
    getStrategy (state) {
        return Object.values(state.strategy);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
