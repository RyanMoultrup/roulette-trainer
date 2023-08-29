import Bet from '@/lib/table/Bet';
import { odds } from '@/lib/table/BetPlacements';
import formatter from "@/lib/formatter";
import { useToast } from "vue-toastification";

const toast = useToast();

let currentBetSpots = [];

const allInsideBets = bets => {
    console.log('allInsideBets:::bets', { ...bets })
    console.log('allInsideBets:::object.values.bets', Object.values({ ...bets }))
    // debugger
    return Object.values(bets)
        .filter(bet => bet.category === 'inside')
        .reduce((accumulator, bet) => {
            accumulator += bet.amount
            return accumulator
        }, 0);
}

const placementCategory = placement => {
    const [placementId] = placement.split('_')
    return odds[placementId].category
}

const state = () => ({
    strategy: {},
    lastBets: {},
    minInsideBetMet: true
});

const removeFromCurrentBets = function (value) {
    let index = currentBetSpots.indexOf(value)
    if (index > -1) {
        currentBetSpots.splice(index, 1)
    }
}

const mutations = {
    async placeBet (state, bet) {
        if (currentBetSpots.includes(bet.placement)) {
            await state.strategy[bet.placement].addChip(bet.chip)
            return
        }

        currentBetSpots.push(bet.placement);
        state.strategy[bet.placement] = new Bet(bet)
    },
    removeBet (state, placement) {
        removeFromCurrentBets(placement)
        if (!state.emittingSpins) {
            state.strategy[placement].removeChips()
        }
        delete state.strategy[placement];
    },
    removeChip (state, { placement, chipIndex }) {
        state.strategy[placement].removeChip(chipIndex)
    },
    replayBet (state, bets) {
        state.strategy = bets
    },
    lastBet (state, bets) {
      state.lastBets = bets
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
        state.minInsideBetMet = value
    }
}

const actions = {
    placeBet ({ commit, rootGetters, state }, bet) {
        console.log('placeBet:::bet::', bet)
        debugger
        const tableLimit = rootGetters['settings/hasTableLimit'];

        if (tableLimit) {
            const betCategory = placementCategory(bet.placement);
            const { maxInside, maxOutside, minInside, minOutside } = rootGetters['settings/getBetLimits'];

            if (betCategory === 'outside') {
                const outsideBetAmount = currentBetSpots.includes(bet.placement)
                    ? state.strategy[bet.placement].amount + +bet.chip.value
                    : +bet.chip.value

                // Check if the total bet value on the individual table spot is
                // greater than the bet minimum. This is required when adding a
                // chip with a value less than the min bet but are placing it
                // on a spot that already has a bet that exceeds the minimum.
                // This only applies to outside bets
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
                const insideBetAmount = allInsideBets(state.strategy)

                console.log('insideBetAmount::', insideBetAmount);

                (+bet.chip.value + insideBetAmount < minInside)
                    ? commit('minInsideBetMet', false)
                    : commit('minInsideBetMet', true)

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
                    state.lastBets[placement].replaceBet()
                }
            }

            await commit('replayBet', { ...state.lastBets })
            currentBetSpots = Object.keys(state.lastBets)
            return true
        }

        return false;
    },
    async doubleBet ({ dispatch, state, rootGetters }) {
        let totalBetAmount = 0
        const bets = Object.values(state.strategy)

        // console.log('BETS::', bets)

        bets.forEach(bet => totalBetAmount += bet.amount)

        // console.log('TOTAL BET AMOUNT:::', totalBetAmount)

        if (totalBetAmount > rootGetters['bank/availableBalance']) return false

        if (rootGetters['settings/hasTableLimit']) {
            // First all the current bets on the table must be split into the inside
            // bets and the outside bets as each have their own rules for max bets
            const { insideBetsTotal, insideBets, outsideBets } = bets
                .reduce((accumulator, bet) => {
                    if (bet.category === 'inside') {
                        accumulator.insideBetsTotal += bet.amount
                        accumulator.insideBets.push(bet)
                    } else {
                        accumulator.outsideBets.push(bet)
                    }
                    return accumulator;
                }, { insideBetsTotal: 0, insideBets: [], outsideBets: [] })

            const { maxOutside, maxInside } = rootGetters['settings/getBetLimits']

            // console.log('insidebets:::', insideBets)
            // console.log('insideBetsTotal:::', insideBetsTotal)
            // console.log('outsidebets:::', outsideBets)

            // Once the bets have been split into two arrays on with inside bet and the other
            // with outside bets, the outside bets must be looped over again and compared against the
            // max bet for outside bets.
            // The outcome of this reduce is two additional arrays. The first array contains all the
            // outside bets that were rejected for violating the max bet settings and the other the
            // outside bets that can be doubled.
            const [rejectedOutsideBets, goodOutsideBets] = outsideBets
                .reduce((accumulator, bet) => {
                    bet.amount * 2 > maxOutside
                        ? accumulator[0].push(bet)
                        : accumulator[1].push(bet)
                    return accumulator
                }, [[], []])


            // Combine all the rejected bets, and bets allowed to be doubled, from the
            // inside and outside bets for further processing.
            // Check that all of the inside bets added together do not exceed the inside max bet
            const allRejectedBets = insideBetsTotal * 2 > maxInside  ? [...insideBets, ...rejectedOutsideBets] : rejectedOutsideBets
            const allGoodBets = insideBetsTotal * 2 <= maxInside  ? [...insideBets, ...goodOutsideBets] : goodOutsideBets

            if (Object.keys(allRejectedBets).length) {
                const rejectedBetsString = allRejectedBets.reduce((string, bet) => {
                    string += ` ${bet.placement} `
                    return string
                }, '');

                toast.error(`The following bets could not be doubled because they would exceed the maximum bet ${rejectedBetsString}`)
            }

            // console.log('all good bets:::', allGoodBets)

            // await dispatch('clearAll')

            allGoodBets.forEach(bet => {
                bet.chips.forEach(async chip => {
                    console.log('foreach bets::', { placement: bet.placement, chip })
                    await dispatch('placeBet', { placement: bet.placement, chip })
                })
            })

            return true
        }

        bets.forEach(bet => {
            console.log('bet before loop::', bet)
            debugger
            bet.chips.forEach(async chip => await dispatch('placeBet', { placement: bet.placement, chip }))
        });

        return true
    },
    async clear ({ dispatch, commit, state }) {
        return new Promise(async (resolve, reject) => {
            currentBetSpots = []
            await dispatch('setLastBet', state.strategy)
            commit('clear')
            resolve()
        })
    },
    async clearAll ({ commit, state }) {
        for (const bet in state.strategy) {
            await commit('removeBet', bet)
        }
    },
    reset ({ commit }) {
        commit('reset')
    }
}

// TODO: find out why this is firing so many times for each action taken in app
const getters = {
    getStrategy: state => Object.values(state.strategy),
    hasBets: state => !!Object.keys(state.strategy).length,
    canSpin: (state, getters, rootState) => {
        return rootState['settings'].tableLimit
            ? !!Object.keys(state.strategy).length && state.minInsideBetMet
            : !!Object.keys(state.strategy).length
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
