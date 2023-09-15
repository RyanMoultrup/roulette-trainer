import Bet from '@/lib/table/Bet'
import formatter from "@/lib/formatter"
import { useToast } from "vue-toastification"
import { odds } from '@/lib/table/BetPlacements'
import highestPayout from "@/lib/stats/HighestPayoutSpots";

const toast = useToast();

let currentBetSpots = [];
let lastBetPlacements = []

const allInsideBets = bets => {
    return Object.values(bets)
        .filter(bet => bet.category === 'inside')
        .reduce((accumulator, bet) => {
            accumulator += bet.amount
            return accumulator
        }, 0)
}

const placementCategory = placement => {
    const [placementId] = placement.split('_')
    return odds[placementId].category
}

const state = () => ({
    strategy: {},
    lastBets: {},
    minInsideBetMet: true,
    probability: 0,
    max: 0,
    min: 0,
    positiveProfit: 0,
    negativeProfit: 0,
    highestPayouts: [],
    currentBetTotal: 0
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
            lastBetPlacements.push(bet.placement)
            return
        }

        currentBetSpots.push(bet.placement)
        lastBetPlacements.push(bet.placement)
        state.strategy[bet.placement] = new Bet(bet)
        state.lastBetPlacement = bet.placement
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
    undoChip (state, placement) {
        state.strategy[placement].undoLastChip()
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
        state.lastBetIndex = null
        state.strategy = {}
        state.lastBets = {}
        state.probability = 0
        state.max = 0
        state.min = 0
        state.negativeProfit = 0
        state.positiveProfit = 0
        state.highestPayouts = []
        state.currentBetTotal = 0
        currentBetSpots = []
    },
    minInsideBetMet (state, value) {
        state.minInsideBetMet = value
    },
    setBetStats (state, stats) {
        Object.assign(state, stats)
    },
    setCurrentBet (state, betTotal) {
        state.currentBetTotal = betTotal
    }
}

const actions = {
    currentBetTotal ({ commit, state }) {
        const bets = Object.values(state.strategy);
        let betsTotal
        if (bets.length) {
            betsTotal = bets.reduce((accumulator, item) => accumulator + +item.get(), 0)
            commit('setCurrentBet', betsTotal)
        } else {
            commit('setCurrentBet', 0)
        }
    },
    undoLastBet ({ commit }) {
        commit('undoChip', lastBetPlacements.pop())
    },
    async placeBet ({ commit, dispatch, rootGetters, state }, bet) {
        const tableLimit = rootGetters['settings/hasTableLimit']

        if (tableLimit) {
            const betCategory = placementCategory(bet.placement);
            const { maxInside, maxOutside, minInside, minOutside } = rootGetters['settings/getBetLimits']

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
                const insideBetAmount = allInsideBets(state.strategy);

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

        await commit('placeBet', bet)
        dispatch('betStats')
        dispatch('currentBetTotal')
        return { success: true, msg: 'Bet placed' }
    },
    betStats ({ commit, state }) {
        const highestPay = highestPayout(Object.values(state.strategy))
        const positiveWinningSpots = highestPay.filter(bet => bet.profit > 0)
        const winProbability =  (positiveWinningSpots.length / 37) * 100

        const probability = winProbability.toFixed(1)
        const max = positiveWinningSpots[0]?.profit ?? 0
        const min = positiveWinningSpots[positiveWinningSpots.length - 1]?.profit ?? 0
        const positiveProfit = positiveWinningSpots.length
        const negativeProfit = highestPay.length - positiveWinningSpots.length

        commit('setBetStats', {
            highestPayouts: highestPay,
            probability,
            max,
            min,
            positiveProfit,
            negativeProfit
        })
    },
    async removeBet ({ commit, dispatch, state, rootGetters }, placement) {
        await commit('removeBet', placement)
        dispatch('betStats')
        dispatch('currentBetTotal')

        const betCategory = placementCategory(placement)
        const { minInside } = rootGetters['settings/getBetLimits']

        if (betCategory === 'inside') {
            // Check if the remaining bets are below the limit
            const insideBetAmount = allInsideBets(state.strategy);

            // if there are no remaining bets set the min limit met to true
            insideBetAmount > 0 && insideBetAmount < minInside
                ? commit('minInsideBetMet', false)
                : commit('minInsideBetMet', true);
        }
    },
    async removeChip({ commit, dispatch, state, rootGetters }, { placement, chipIndex, chip }) {
        const betCategory = placementCategory(placement)
        const placementBetAmount = state.strategy[placement].amount - +chip.value
        const { minOutside, minInside } = rootGetters['settings/getBetLimits']

        if (betCategory === 'outside') {
            if (placementBetAmount > 0 && placementBetAmount < minOutside) {
                return {
                    success: false,
                    msg: 'Cannot remove chip as that would put your bet under the Minimum Outside Bet'
                }
            }

            placementBetAmount > 0
                ? await commit('removeChip', { placement, chipIndex })
                : await commit('removeBet', placement)

            dispatch('betStats')
            dispatch('currentBetTotal')

            return {
                success: true,
                msg: ''
            }
        }

        placementBetAmount > 0
            ? await commit('removeChip', { placement, chipIndex })
            : await commit('removeBet', placement)

        dispatch('betStats')
        dispatch('currentBetTotal')

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
    async replayBet ({ commit, dispatch, state, rootGetters }) {
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

            dispatch('betStats')
            dispatch('currentBetTotal')

            currentBetSpots = Object.keys(state.lastBets)
            return true
        }

        return false;
    },
    async doubleBet ({ dispatch, state, rootGetters }) {
        let totalBetAmount = 0
        const bets = Object.values(state.strategy)

        bets.forEach(bet => totalBetAmount += bet.amount)

        if (totalBetAmount > rootGetters['bank/availableBalance']) return false

        if (rootGetters['settings/hasTableLimit']) {
            // First all the current bets on the table must be split into the inside
            // bets and the outside bets as each have their own rules for max bets.
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
                }, '')

                toast.error(`The following bets could not be doubled because they would exceed the maximum bet ${rejectedBetsString}`)
            }

            allGoodBets.forEach(bet => {
                [...bet.chips].forEach(async chip => await dispatch('placeBet', { placement: bet.placement, chip }))
            })

            dispatch('betStats')
            dispatch('currentBetTotal')

            return true
        }

        // Make a deep copy of bets because if this doesn't happen as soon as the first bet is placed
        // the reactive nature of "bets" alters the original array causing inaccurate results
        [...bets].forEach(bet => {
            [...bet.chips].forEach(async chip => await dispatch('placeBet', { placement: bet.placement, chip }))
        })

        dispatch('betStats')
        dispatch('currentBetTotal')

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
    },
    getProbability: state => state.probability,
    getBetMax: state => state.max,
    getBetMin: state => state.min,
    getPositiveProfit: state => state.positiveProfit,
    getNegativeProfit: state => state.negativeProfit,
    getHighestPayouts: state => state.highestPayouts,
    getCurrentBetTotal: state => state.currentBetTotal
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
