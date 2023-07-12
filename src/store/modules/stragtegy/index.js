import Bet from '@/lib/table/Bet';
import { odds } from '@/lib/table/BetPlacements';
import formatter from "@/lib/formatter";

let currentBetSpots = [];

const state = () => ({
    strategy: {},
    lastBets: {},
    minInsideBetMet: true
});

const removeFromCurrentBets = function (value) {
    let index = currentBetSpots.indexOf(value);
    if (index > -1) {
        currentBetSpots.splice(index, 1);
    }
}

const mutations = {
    async placeBet (state, bet) {
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
    },
    minInsideBetMet (state, value) {
        state.minInsideBetMet = value;
    }
}

const actions = {
    async placeBet ({ commit, rootGetters, state }, bet) {
        const tableLimit = rootGetters['settings/hasTableLimit'];

        if (tableLimit) {
            const [placementId] = bet.placement.split('_');
            const betCategory = odds[placementId].category;

            // check if it's an outside bet --> getBetCategory(bet.placement)
            // make sure the bet meets the outside bet minimum
            // if outside bet make sure all outside bets don't exceed outside bet max
            // else if inside bet check that bet does not exceed maximum
            // inside bet minimum is checked during the spin

            const { maxInside, maxOutside, minInside, minOutside } = rootGetters['settings/getBetLimits'];

            if (betCategory === 'outside') {
                const outsideBetAmount = currentBetSpots.includes(bet.placement)
                    ? state.strategy[bet.placement].amount + +bet.chip.value
                    : +bet.chip.value

                // Check if the total bet value on the individual table spot is
                // greater than the bet minimum. This is required when adding a
                // chip with a value less than the min bet but are placing it
                // on a spot that already has a bet that exceeds the minimum
                if (outsideBetAmount < minOutside) {
                    return {
                        success: false,
                        msg: `The minimum outside bet is ${formatter.money(minOutside)}`
                    }
                }

                console.log('outside bet amount::', outsideBetAmount);

                if (outsideBetAmount > maxOutside) {
                    return {
                        success: false,
                        msg: `The maximum outside bet is ${formatter.money(maxOutside)}`
                    }
                }
            }

            if (betCategory === 'inside') {
                const insideBetAmount = Object.values(state.strategy)
                    .filter(bet => bet.category === 'inside')
                    .reduce((accumulator, bet) => accumulator + bet.amount, 0);

                (+bet.chip.value + insideBetAmount < minInside)
                    ? commit('minInsideBetMet', false)
                    : commit('minInsideBetMet', true);

                if (+bet.chip.value + insideBetAmount > maxInside) {
                    return {
                        success: false,
                        msg: `The maximum inside bet is ${formatter.money(maxInside)}`
                    }
                }
            }
        }

        commit('placeBet', bet);
        return { success: true, msg: 'Bet placed' }
    },
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
                        commit('placeBet', { placement, chip });
                    });
                }
            }

            return true;
        }

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
    getStrategy: state => Object.values(state.strategy),
    canSpin: state => !!Object.keys(state.strategy).length && state.minInsideBetMet
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
