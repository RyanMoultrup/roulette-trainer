<template>
  <div class="rounded text-gray-400">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-row">
        <this-round />
        <winning-numbers />
      </div>

    </div>
  </div>
</template>

<script>
import formatter from "@/lib/formatter"
import { mapActions, mapGetters } from "vuex"
import BasePill from "@/components/ui/Base/BasePill.vue"
import CoverageTable from "@/components/CoverageTable.vue"
import WinProbability from "@/components/WinProbability.vue"
import ThisRound from "@/components/ThisRound.vue";
import WinningNumbers from "@/components/WinningNumbers.vue";

export default {
  components: { WinningNumbers, ThisRound }
}
</script>
