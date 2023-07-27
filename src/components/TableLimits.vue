<template>
  <div class="font-lobster text-2xl text-gray-300 opacity-80 flex flex-row justify-between">
    <div class="flex flex-col">
      <span class="mr-4">Min Inside Bet: {{ formatter.money(getBetLimits.minInside) }}</span>
      <span class="mr-4">Max Inside Bet: {{ formatter.money(getBetLimits.maxInside) }}</span>
    </div>
    <div class="flex items-end">
      <current-bet class="text-gray-200" />
    </div>
    <div class="flex flex-col">
      <span>Min Outside Bet: {{ formatter.money(getBetLimits.minOutside) }}</span>
      <span class="mr-4">Max Outside Bet: {{ formatter.money(getBetLimits.maxOutside) }}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import formatter from "../lib/formatter";
import CurrentBet from '@/components/CurrentBet.vue';

export default {
  components: { CurrentBet },
  computed: {
    formatter () {
      return formatter;
    },
    ...mapGetters('settings', ['getBetLimits'])
  }
}
</script>