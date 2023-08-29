<template>
  <div class="rounded text-gray-400">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-row">
        <div class="border-r border-r-green-700 grow pr-4">
          <div class="font-lobster text-2xl">This Round</div>
          <div class="flex items-center gap-3 group">
            <span>Bets: {{ bets.length }}</span>
          </div>

          <div class="relative">
            <div class="grid grid-cols-[1.3fr,0.9fr,0.9fr,1fr,0.9fr] top-0 left-0 w-full px-2 pt-2 border-b border-b-accent-200">
              <span>Placement</span>
              <span>Odds</span>
              <span>Bet</span>
              <span>Outcome</span>
              <span>Payout</span>
            </div>
            <div class="relative px-2 pb-2 pt-1 max-h-40 overflow-y-auto border-t border-t-green-600">
              <div v-for="bet in bets" :key="bet.type" class="border-b border-b-accent-100">
                <div class="grid grid-cols-[1.3fr,0.9fr,0.9fr,1fr,0.9fr] justify-between">
                  <span style="color: #D49228;" class="mr-2 ">{{ getBetPlacement(bet) }}</span>
                  <span>{{ getOdds(bet) }}%</span>
                  <span class="mr-2 ">{{ formatter.money(bet.bet) }}</span>
                  <span class="mr-2">{{ bet.won ? 'Won' : 'Lost' }}</span>
                  <span class="">{{ formatter.money(bet.wonRound ? bet.won : `-${bet.loss}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-l border-l-green-900 px-4 pb-4">
          <div class="font-lobster text-2xl">Winning Numbers</div>
          <div class="flex items-baseline gap-3">
            <span>Total: {{ getHighestPayout.length }}</span>
            <div v-if="negativeProfit > 0" class="flex gap-1 items-center danger">
              <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
              <span  class="text-sm danger">{{ negativeProfit }} bets have zero or negative payout</span>
            </div>
          </div>

          <div class="grid grid-cols-3 top-0 left-0 w-full px-2 pt-2 border-b border-b-accent-200">
            <span>Spin</span>
            <span>Payout</span>
            <span>Profit</span>
          </div>
          <div class="w-80 p-2 max-h-40 overflow-y-auto">
            <div v-for="spot in getHighestPayout" :key="spot" class="flex flex-col border-b border-b-accent-100 py-0.5">
              <div class="grid grid-cols-3 justify-between">
                <span
                    class="pt-0.5 w-5 h-5 mb-1 text-xs text-center text-white rounded-full"
                    :class="spot.color === 'red' ? 'bg-red-800' : 'bg-black'"
                >
                  {{ spot.spot }}
                </span>
                <span class="mr-2 ">{{ formatter.money(spot.payout) }}</span>
                <span :class="{ 'negative-profit': spot.profit < 0 }">{{ formatter.money(spot.profit) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-4 items-center">
          <span class="font-lobster text-2xl">{{ probability }}% Chance of profit</span>
          <span class="font-lobster text-xl">Max Profit: {{ formatter.money(max) }}</span>
          <span class="font-lobster text-xl">Min Profit: {{ formatter.money(min) }}</span>
        </div>
        <div class="font-lobster text-xl">Actual Profit: {{ formatter.money(profit) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import {computed, watch, ref, onUnmounted} from "vue"
import formatter from "@/lib/formatter"
import highestPayout from "@/lib/stats/HighestPayoutSpots"
import { odds } from "@/lib/table/BetPlacements";

export default {
  setup () {
    let probability = ref(0)
    let max = ref(0)
    let min = ref(0)
    let positiveProfit = ref(0)
    let negativeProfit = ref(0)
    const store = useStore()
    const format = formatter

    const bets = computed(() => store.getters['simulation/getFilteredOutcomes'])

    let profit = computed(() => {
      return bets.value.reduce((r, b) => {
        return b.wonRound ? r + b.won : r - b.loss
      }, 0)
    })

    const getHighestPayout = computed(() => highestPayout(store.getters['strategy/getStrategy']))

    const unwatch = watch(getHighestPayout, (newVal) => {
      const highestPay = getHighestPayout.value;

      console.log('highestPay::', highestPay)

      const positiveWinningSpots = highestPay.filter(bet => bet.profit > 0);
      const winProbability =  (positiveWinningSpots.length / 37) * 100;

      probability.value = +winProbability.toFixed(1);
      max.value = positiveWinningSpots[0]?.profit ?? 0;
      min.value =  positiveWinningSpots[positiveWinningSpots.length - 1]?.profit ?? 0;
      positiveProfit.value = positiveWinningSpots.length;
      negativeProfit.value = highestPay.length - positiveWinningSpots.length;
    })

    const getBetPlacement = (bet) => {
      const [placementId] = bet.placement.split('_')
      const placement = odds[placementId]
      return placement.name
    }

    const getOdds = (bet) => {
      const [placementId] = bet.placement.split('_')
      const placement = odds[placementId]
      return placement.odds.european
    }

    onUnmounted(() => unwatch())

    return {
      bets,
      formatter: format,
      probability,
      max,
      min,
      positiveProfit,
      negativeProfit,
      getHighestPayout,
      getBetPlacement,
      getOdds,
      profit
    }
  }
}
</script>
<style scoped>
.negative-profit { color: #9e4d4d; transform: translateX(-0.7rem)}
.danger { color: #9e4d4d }
</style>
