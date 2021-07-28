<template>
  <section class="flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
    <div id="hits-chart"></div>
    <div id="win-loss-chart"></div>
    <br>
    <div id="win-loss-row-chart" class="flex-shrink"></div>
  </section>
</template>

<script>
import WinLossChart from "@/lib/charts/WinLossChart";
import WinLossBankChart from "@/lib/charts/WinLossBankChart";
import { mapGetters } from "vuex";
import {redrawAll} from "dc";
import HitsChart from "@/lib/charts/HitsChart";

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

    // instantiate the charts
    // add charts to DC registry
    // render the chart when the first data comes in
    // redraw the charts when the rest of the data comes in

    // new ChartRegistry.list().forEach(chart => {
    //
    // });

    let hitsChart = new HitsChart();
    hitsChart.render(this.getOutcomes().get(), this.getStrategy());
  }
}
</script>