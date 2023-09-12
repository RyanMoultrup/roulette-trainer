<template>
  <div class="font-lobster text-sm lg:text-xl text-gray-300 opacity-80">
    <div  v-if="hasTableLimit"  class="flex gap-2 justify-between w-full">
      <div class="flex flex-row gap-4">
        <span>Min In: {{ formatter.money(getBetLimits.minInside) }}</span>
        <span>Max In: {{ formatter.money(getBetLimits.maxInside) }}</span>
      </div>
      <div class="flex flex-row gap-4">
        <span>Min Out: {{ formatter.money(getBetLimits.minOutside) }}</span>
        <span>Max Out: {{ formatter.money(getBetLimits.maxOutside) }}</span>
      </div>
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
    ...mapGetters('settings', ['getBetLimits', 'hasTableLimit'])
  }
}
</script>