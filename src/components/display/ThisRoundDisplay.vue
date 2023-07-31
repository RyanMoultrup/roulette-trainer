<template>
  <div class="this-round flex rounded text-gray-400">

    <div class="p-5 flex flex-col justify-between bg-gradient-to-tr from-green-700 via-green-800 to-green-800 border border-green-800 shadow h-full w-full">
      <div class="flex flex-row">
        <div class="px-4 border-r border-r-green-700">
          <div class="font-lobster text-2xl">This Round</div>
          <span class="mb-3">Bets: {{ getStrategy.length }}</span>

          <div class="mt-2 w-80 p-2 max-h-40 overflow-y-auto">
            <div v-for="bet in allBets" :key="bet.type" class="flex flex-col border-b border-b-green-600">
              <div class="flex flex-row justify-between">
                <span style="color: #D49228;" class="mr-2 ">{{ bet.name() }}</span>
                <span>{{ bet.odds }}%</span>
                <span class="mr-2 "><span class="font-normal">bet</span> {{ formatter.money(bet.amount) }}</span>
                <!--              <span class="mr-1 lowercase">{{ outcome.outcome }}</span>-->
                <!--              <span class="">${{ outcome.outcome === 'Won' ? outcome.won : outcome.loss }}</span>-->
                <!--              <span class="mr-1 lowercase">{{ outcome.outcome }}</span>-->
                <span class="">{{ formatter.money(bet.payout()) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-l border-l-green-900 px-4 pb-4">
          <div class="font-lobster text-2xl">Winning Numbers</div>
          <span class="mb-3">Total: {{ getHighestPayouts.length }}</span>

          <div class="mt-2 w-80 p-2 max-h-40 overflow-y-auto">
            <!--        <div class="flex flex-row items-end">-->
            <div v-for="spot in getHighestPayouts" :key="spot" class="flex flex-col border-b border-b-green-600 py-0.5">
              <div class="flex flex-row justify-between">
                <span
                    class="pt-0.5 w-5 h-5 mb-1 text-xs text-center text-white rounded-full"
                    :class="spot.color === 'red' ? 'bg-red-800' : 'bg-black'"
                >
                  {{ spot.spot }}
                </span>
                <span class="mr-2 "><span class="font-normal">Payout</span> {{ formatter.money(spot.payout) }}</span>
                <span class="">Profit: {{ formatter.money(spot.profit) }}</span>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import formatter from "@/lib/formatter";
import highestPayout from "@/lib/stats/HighestPayoutSpots";

export default {
  setup () {
    return { formatter }
  },
  data () {
    return {
      max: 0,
      min: 0,
      probability: 0,
      positiveProfit: 0,
      negativeProfit: 0
    }
  },
  computed: {
    ...mapGetters('strategy', ['getStrategy']),
    allBets () {
      return this.getStrategy.reverse();
    },
    getHighestPayouts () {
      return highestPayout(this.getStrategy)
    }
  },
  watch: {
    getHighestPayouts (newVal) {
      const highestPay = this.getHighestPayouts;
      const positiveWinningSpots = highestPay.filter(bet => bet.profit > 0);
      const winProbability =  (positiveWinningSpots.length / 37) * 100;

      this.probability = winProbability.toFixed(1);
      this.max = positiveWinningSpots[0]?.profit ?? 0;
      this.min =  positiveWinningSpots[positiveWinningSpots.length - 1]?.profit ?? 0
    }
  }
}
</script>

