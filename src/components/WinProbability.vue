<template>
  <div class="flex gap-4 items-center">
    <span class="font-lobster text-2xl">{{ probability }}% Chance of profit</span>
    <span class="font-lobster text-xl">Max Profit: {{ formatter.money(maxWin) }}</span>
    <span class="font-lobster text-xl">Min Profit: {{ formatter.money(minWin) }}</span>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import formatter from "@/lib/formatter"

const store = useStore()
const probability = computed(() => store.getters['strategy/getProbability'])
const maxWin = computed(() => store.getters['strategy/getBetMax'])
const minWin = computed(() => store.getters['strategy/getBetMin'])
</script>