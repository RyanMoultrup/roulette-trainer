<template>
  <section class="charts flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
    <div class="hits-chart">
      <div id="hits-chart"></div>
    </div>
    <div class="win-loss-bank-chart">
      <div id="win-loss-chart"></div>
    </div>
    <br>
    <div class="win-loss-chart">
      <div id="win-loss-row-chart" class="flex-shrink"></div>
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
