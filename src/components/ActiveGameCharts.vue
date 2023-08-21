<template>
  <section :class="gridClass" class="bg-opacity-0 mx-4 mt-4 mb-2">
    <base-card class="hits-cart this-round" :top-corner-gradient="true">
      <this-round-display v-if="mode === 'practice'" class="relative overflow-hidden z-0 h-full" />
      <this-round-display-review v-if="mode === 'review'" class="relative overflow-hidden z-0 h-full" />
    </base-card>

    <base-card :top-full="true">
      <div class="relative win-loss-bank-card overflow-hidden flex flex-col gap-3">
        <display-stats />
        <win-loss-bank-chart class="justify-self-center" />
      </div>
    </base-card>
  </section>
</template>

<script>
import { redrawAll } from "dc"
import { mapGetters, useStore } from "vuex"
import DisplayStats from "@/components/DisplayStats.vue"
import BaseCard from "@/components/ui/Base/BaseCard.vue"
import WinLossBankChart from "@/components/charts/WinLossBankChart.vue"
import ThisRoundDisplay from "@/components/display/ThisRoundDisplay.vue"
import ThisRoundDisplayReview from "@/components/display/ThisRoundDisplayReview.vue"
import { computed } from "vue";
import { useGridProps } from "@/composables/useGridProp";

export default {
  components: { BaseCard, ThisRoundDisplay, ThisRoundDisplayReview, DisplayStats, WinLossBankChart },
  props: {
    ...useGridProps()
  },
  setup () {
    const store = useStore()
    const mode = computed(() => store.getters['simulation/getMode'])

    return {
      mode
    }
  },
  data () {
    return {
      showPlaceholder: true,
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    ...mapGetters('strategy', ['getStrategy'])
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll();
      }
    })

    // const winLossChart = new WinLossChart();
    // winLossChart
    //     // .parentHeight(this.$refs.winLossPieChart.clientHeight - 30)
    //     // .parentWidth(this.$refs.winLossPieChart.clientWidth - 30)
    //     .parentHeight(100)
    //     .parentWidth(null)
    //     .render(outcomes);
  }
}
</script>
