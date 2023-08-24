<template>
  <div class="rounded text-gray-400">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-row">
        <div class="border-r border-r-green-700 grow pr-4">
          <div class="font-lobster text-2xl">This Round</div>
          <div class="flex items-center gap-3 group">
            <span>Bets: {{ getStrategy.length }}</span>
            <base-pill class="hidden group-hover:block"><span class="text-xs cursor-pointer flex-shrink-0" @click="clearAllBets">Clear All</span></base-pill>
          </div>

          <div class="relative">
            <div class="grid grid-cols-[1.3fr,0.9fr,0.9fr,0.9fr] top-0 left-0 w-full px-2 pt-2 border-b border-b-accent-200">
              <span>Placement</span>
              <span>Odds</span>
              <span>Bet</span>
              <span>Payout</span>
            </div>
            <div class="relative px-2 pb-2 pt-1 h-32 overflow-y-auto">
              <div v-for="bet in allBets" :key="bet.type" class="border-b border-b-accent-100">
                <div class="grid grid-cols-[1.3fr,0.9fr,0.9fr,0.9fr] justify-between">
                  <span style="color: #D49228;" class="mr-2 ">{{ bet.name() }}</span>
                  <span>{{ bet.odds }}%</span>
                  <span class="mr-2 ">{{ formatter.money(bet.amount) }}</span>
                  <span class="">{{ formatter.money(bet.payout()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-l border-l-green-900 px-4 pb-4">
          <div class="font-lobster text-2xl">Winning Numbers</div>
          <div class="flex items-baseline gap-3">
            <span>Total: {{ getHighestPayouts.length }}</span>
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
          <div class="w-80 p-2 h-32 overflow-y-auto">
            <div v-for="spot in getHighestPayouts" :key="spot" class="flex flex-col border-b border-b-accent-100 py-0.5">
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

      <div class="flex gap-4 items-center">
        <span class="font-lobster text-2xl">{{ probability }}% Chance of profit</span>
        <span class="font-lobster text-xl">Max Profit: {{ formatter.money(max) }}</span>
        <span class="font-lobster text-xl">Min Profit: {{ formatter.money(min) }}</span>
      </div>
      <coverage-table :payouts="getHighestPayouts" :total-bet="currentBet" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import formatter from "@/lib/formatter";
import highestPayout from "@/lib/stats/HighestPayoutSpots";
import BasePill from "@/components/ui/Base/BasePill.vue";
import CoverageTable from "@/components/CoverageTable.vue";

export default {
  components: { CoverageTable, BasePill },
  setup () {
    return { formatter }
  },
  data () {
    return {
      max: 0,
      min: 0,
      probability: 0,
      positiveProfit: 0,
      negativeProfit: 0,
      currentBet: 0
    }
  },
  computed: {
    ...mapGetters('strategy', ['getStrategy']),
    allBets () {
      return this.getStrategy.reverse();
    },
    getHighestPayouts () {
      return highestPayout(this.getStrategy)
    },
    currentBetTotal () {
      let bets = this.getStrategy;
      if (bets.length) return bets.reduce((accumulator, item) => accumulator + +item.get(), 0);
      return 0;
    },
  },
  watch: {
    getHighestPayouts (newVal) {
      const highestPay = this.getHighestPayouts;
      const positiveWinningSpots = highestPay.filter(bet => bet.profit > 0);
      const winProbability =  (positiveWinningSpots.length / 37) * 100;

      this.probability = winProbability.toFixed(1);
      this.max = positiveWinningSpots[0]?.profit ?? 0;
      this.min = positiveWinningSpots[positiveWinningSpots.length - 1]?.profit ?? 0;
      this.positiveProfit = positiveWinningSpots.length;
      this.negativeProfit = highestPay.length - positiveWinningSpots.length;
    },
    currentBetTotal (newVal, oldVal) {
      this.currentBet = newVal
    }
  },
  methods: {
    ...mapActions('strategy', ['clearAll', 'removeBet']),
    clearAllBets () {
      this.clearAll();
    }
  }
}
</script>
<style scoped>
.negative-profit { color: #9e4d4d; transform: translateX(-0.7rem)}
.danger { color: #9e4d4d }
</style>

