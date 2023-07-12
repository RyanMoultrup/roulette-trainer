import Bet from '@/lib/table/Bet';
import { odds } from '@/lib/table/BetPlacements';
import formatter from "@/lib/formatter";

let currentBetSpots = [];

const state = () => ({
    strategy: {},
    lastBets: {},
    outsideBetAmt: 0,
    insideBetAmt: 0
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
    }
}

const actions = {
    countBets ({ state }) {
        const amount = state.strategy.reduce((accumulator, bet) => accumulator + bet.amount, 0)
        console.log('bet amount::', amount);
    },
    placeBet ({ commit, rootGetters, state }, bet) {
        const tableLimit = rootGetters['settings/hasTableLimit'];

        if (Object.keys(state.strategy).length) {
            console.log('state strat::', state.strategy);
            const amount = Object.values(state.strategy).reduce((accumulator, bet) => accumulator + bet.amount, 0)
            console.log('THE bet amount::', amount);
        }

        return {
            success: true,
            msg: ''
        };

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
                if (bet.chip.value < minOutside) {
                    return {
                        success: false,
                        msg: `The minimum outside bet is ${formatter.money(minOutside)}`
                    }
                }

                if (bet.chip.value > maxOutside) {
                    return {
                        success: false,
                        msg: `The maximum outside bet is ${formatter.money(maxOutside)}`
                    }
                }
            }

            if (betCategory === 'inside') {
                if (bet.chip.value < minInside) {
                    return {
                        success: false,
                        msg: `The minimum inside bet is ${formatter.money(minInside)}`
                    }
                }

                if (bet.chip.value > maxInside) {
                    return {
                        success: false,
                        msg: `The maximum inside bet is ${formatter.money(maxInside)}`
                    }
                }

                return { success: true, msg: 'Bet placed' }
            }
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
    getStrategy (state) {
        return Object.values(state.strategy);
    },
    canSpin (state) {
        return !!Object.keys(state.strategy).length
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
