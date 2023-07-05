<template>
  <section class="charts bg-opacity-0 p-4">
    <div class="hits-chart chart-border bg-green-700">
      <div id="hits-chart" class="p-4"></div>
    </div>
    <div class="win-loss-bank-chart chart-border bg-green-700">
      <div id="win-loss-chart" class="p-4"></div>
    </div>
    <div class="win-loss-chart chart-border bg-green-700">
      <div id="win-loss-row-chart" class="flex-shrink p-4"></div>
    </div>
  </section>
</template>

<script>
import { redrawAll } from "dc";
import { mapGetters } from "vuex";
import HitsChart from "@/lib/charts/HitsChart.js";
import WinLossChart from "@/lib/charts/WinLossChart.js";
import WinLossBankChart from "@/lib/charts/WinLossBankChart.js";

export default {
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    ...mapGetters('strategy', ['getStrategy'])
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        redrawAll();
      }
    })

    const outcomes = this.getOutcomes();

    let winLossBankChart = new WinLossBankChart();
    winLossBankChart.render(outcomes);

    let winLossChart = new WinLossChart();
    winLossChart.render(outcomes);

    let hitsChart = new HitsChart();
    hitsChart.render(outcomes);
  }
}
</script>
<style>
.chart-border {
  @apply rounded border-green-900 border
}
</style>

