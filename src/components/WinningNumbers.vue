<template>
  <div class="border-l border-l-green-900 px-4 pb-4">
    <div class="font-lobster text-2xl">Winning Numbers</div>
    <div class="flex items-baseline gap-3">
      <span>Total: {{ getHighestPayouts.length }}</span>
      <div v-if="getNegativeProfit > 0" class="flex gap-1 items-center danger">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
        <span  class="text-sm danger">{{ getNegativeProfit }} bets have zero or negative payout</span>
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
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import formatter from "@/lib/formatter"

const store = useStore()

const getHighestPayouts = computed(() => store.getters['strategy/getHighestPayouts'])
const getNegativeProfit = computed(() => store.getters['strategy/getNegativeProfit'])
</script>

<style scoped>
.negative-profit { color: #9e4d4d; transform: translateX(-0.7rem)}
.danger { color: #9e4d4d }
</style>
