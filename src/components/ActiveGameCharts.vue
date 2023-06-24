<template>
  <section class="flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
    <div id="hits-chart"></div>
    <div id="win-loss-chart"></div>
    <br>
    <div id="win-loss-row-chart" class="flex-shrink"></div>
  </section>
</template>

<script>
import HitsChart from "@/lib/charts/HitsChart.js";
import WinLossChart from "@/lib/charts/WinLossChart.js";
import WinLossBankChart from "@/lib/charts/WinLossBankChart.js";
import { mapGetters } from "vuex";
import { redrawAll } from "dc";

export default {
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    ...mapGetters('strategy', ['getStrategy'])
  },
  watch: {
    '$store.state.simulation.spin': function () {
      redrawAll();
    },
  },
  mounted () {
    let winLossBankChart = new WinLossBankChart();
    winLossBankChart.render(this.getOutcomes().get());

    let winLossChart = new WinLossChart();
    winLossChart.render(this.getOutcomes().get());

    let hitsChart = new HitsChart();
    hitsChart.render(this.getOutcomes().get(), this.getStrategy());
  }
}
</script>
