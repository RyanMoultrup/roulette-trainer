<template>
  <div class="font-lobster text-xl text-gray-300 opacity-80 flex flex-row justify-between">
    <div class="flex flex-col">
      <span>Min Inside Bet: {{ formatter.money(getBetLimits.minInside) }}</span>
      <span>Max Inside Bet: {{ formatter.money(getBetLimits.maxInside) }}</span>
    </div>
    <div class="flex items-end">
      <current-bet class="text-gray-200 text-3xl" />
    </div>
    <div class="flex flex-col">
      <span>Min Outside Bet: {{ formatter.money(getBetLimits.minOutside) }}</span>
      <span>Max Outside Bet: {{ formatter.money(getBetLimits.maxOutside) }}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import formatter from "../lib/formatter";
import CurrentBet from '@/components/CurrentBet.vue';
import SelectedChip from "@/components/SelectedChip.vue";

export default {
  components: { SelectedChip, CurrentBet },
  computed: {
    formatter () {
      return formatter;
    },
    ...mapGetters('settings', ['getBetLimits'])
  }
}
</script>