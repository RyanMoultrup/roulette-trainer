import Bet from '@/lib/table/Bet';
import { odds } from '@/lib/table/BetPlacements';
import formatter from "@/lib/formatter";

let currentBetSpots = [];

const allInsideBets = bets => {
    return Object.values(bets)
        .filter(bet => bet.category === 'inside')
        .reduce((accumulator, bet) => accumulator + bet.amount, 0);
}

const placementCategory = placement => {
    const [placementId] = placement.split('_');
    return odds[placementId].category;
}

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
    removeChip (state, { placement, chipIndex }) {
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
    placeBet ({ commit, rootGetters, state }, bet) {
        const tableLimit = rootGetters['settings/hasTableLimit'];

        if (tableLimit) {
            const betCategory = placementCategory(bet.placement);
            const { maxInside, maxOutside, minInside, minOutside } = rootGetters['settings/getBetLimits'];

            if (betCategory === 'outside') {
                const outsideBetAmount = currentBetSpots.includes(bet.placement)
                    ? state.strategy[bet.placement].amount + +bet.chip.value
                    : +bet.chip.value;

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

                if (outsideBetAmount > maxOutside) {
                    return {
                        success: false,
                        msg: `The maximum outside bet is ${formatter.money(maxOutside)}`
                    }
                }
            }

            if (betCategory === 'inside') {
                const insideBetAmount = allInsideBets(state.strategy);

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
    async removeBet ({ commit, state, rootGetters }, placement) {
        await commit('removeBet', placement);

        const betCategory = placementCategory(placement);
        const { minInside } = rootGetters['settings/getBetLimits'];

        if (betCategory === 'inside') {
            // Check if the remaining bets are below the limit
            const insideBetAmount = allInsideBets(state.strategy);

            // if there are no remaining bets set the min limit met to true
            insideBetAmount > 0 && insideBetAmount < minInside
                ? commit('minInsideBetMet', false)
                : commit('minInsideBetMet', true);
        }
    },
    async removeChip({ commit, state, rootGetters }, { placement, chipIndex, chip }) {
        const betCategory = placementCategory(placement);
        const placementBetAmount = state.strategy[placement].amount - +chip.value;
        const { minOutside, minInside } = rootGetters['settings/getBetLimits'];

        if (betCategory === 'outside') {
            if (placementBetAmount > 0 && placementBetAmount < minOutside) {
                return {
                    success: false,
                    msg: 'Cannot remove chip as that would put your bet under the Minimum Outside Bet'
                }
            }

            placementBetAmount > 0 ? commit('removeChip', { placement, chipIndex }) : commit('removeBet', placement);

            return {
                success: true,
                msg: ''
            }
        }

        placementBetAmount > 0
            ? await commit('removeChip', { placement, chipIndex })
            : await commit('removeBet', placement);

        // Need to get the total inside bets after removing the bet
        // and compare that against the min inside bet
        const insideBetAmount = allInsideBets(state.strategy);

        insideBetAmount > 0 && insideBetAmount < minInside
            ? commit('minInsideBetMet', false)
            : commit('minInsideBetMet', true);

        return {
            success: true,
            msg: ''
        }
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

        Object.values(state.strategy).forEach(bet => totalBetAmount += bet.amount);

        if (totalBetAmount < rootGetters['bank/availableBalance']) {
            Object.values(state.strategy).forEach(bet => {
                bet.chips.forEach(chip => commit('placeBet', { placement: bet.placement, chip }));
            });

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
