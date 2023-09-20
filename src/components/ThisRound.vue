<template>
  <div class="border-r border-r-green-700 grow pr-4">
    <div class="font-lobster text-2xl">This Round</div>
    <div class="flex items-center gap-3 group">
      <span>Bets: {{ allBets.length }}</span>
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
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import formatter from "@/lib/formatter"
import BasePill from "@/components/ui/Base/BasePill.vue"

const store = useStore()

const clearAllBets = () => store.dispatch('strategy/clearAll')
const allBets = computed(() => store.getters['strategy/getStrategy'])
</script>
