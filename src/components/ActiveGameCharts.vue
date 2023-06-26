<template>
  <section class="flex flex-row justify-around items-center bg-gray-700 bg-opacity-0 pt-4 pb-4">
    <div id="hits-chart"></div>
    <div id="win-loss-chart"></div>
    <br>
    <div id="win-loss-row-chart" class="flex-shrink"></div>
    <div id="spin-table"></div>
  </section>
</template>

<script>
import HitsChart from "@/lib/charts/HitsChart.js";
import WinLossChart from "@/lib/charts/WinLossChart.js";
import WinLossBankChart from "@/lib/charts/WinLossBankChart.js";
import { mapGetters } from "vuex";
import { redrawAll } from "dc";
import { spinHistoryTable } from "../lib/charts/SpinHistoryTable";

export default {
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    ...mapGetters('strategy', ['getStrategy'])
  },
  // watch: {
  //   '$store.state.simulation.spin': function () {
  //     redrawAll();
  //   },
  // },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        redrawAll();
        console.log('Mutation callback::::::::::::', mutation);
      }
    })

    const outcomes = this.getOutcomes();

    let spinTable = spinHistoryTable();
    spinTable
        .onRedraw(() => {
          console.log('SPIN TABLE FILTERED::::', this);
        });
    spinTable.render();

    let winLossBankChart = new WinLossBankChart();
    winLossBankChart.render(outcomes);

    let winLossChart = new WinLossChart();
    winLossChart.render(outcomes);

    let hitsChart = new HitsChart();
    hitsChart.render(outcomes, this.getStrategy());
  }
}
</script>
