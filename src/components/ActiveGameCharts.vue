<template>
  <section class="charts bg-opacity-0 mx-4 mb-2">
    <div class="hits-card card-bg-border bg-green-700" ref="hitsChart">
      <div id="hits-chart" class="p-4 h-full" ref="hitsChart"></div>
    </div>
    <div class="win-loss-bank-card card-bg-border bg-green-700">
      <div id="win-loss-chart" class="p-4 h-full" ref="winLossBankChart"></div>
    </div>
    <div class="win-loss-card card-bg-border bg-green-700">
      <div id="win-loss-row-chart" class="p-4 h-full w-full" ref="winLossPieChart"></div>
    </div>
  </section>
</template>

<script>
import { redrawAll } from "dc";
import { mapGetters } from "vuex";
import HitsChart from "@/lib/charts/HitsChart.js";
import WinLossChart from "@/lib/charts/WinLossChart.js";
import WinLossBankChart from "@/lib/charts/WinLossBankChart.js";
import { useResizeObserver} from "@vueuse/core";

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

    function convertRemToPixels(rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    const outcomes = this.getOutcomes();

    const winLossBankChart = new WinLossBankChart();
    const winLossBankRef = this.$refs.winLossBankChart;
    winLossBankChart
        .parentHeight(winLossBankRef.clientHeight - 20)
        .parentWidth(winLossBankRef.clientWidth - 20)
        .render(outcomes);

    const winLossChart = new WinLossChart();
    winLossChart
        .parentHeight(this.$refs.winLossPieChart.clientHeight - 30)
        .parentWidth(this.$refs.winLossPieChart.clientWidth - 30)
        .render(outcomes);


    const hitsChart = new HitsChart();
    hitsChart
        .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

    // useResizeObserver(this.$refs.winLossBankChart, entry => {
    //   console.log('resized:::', entry);
    //   const { width, height } = entry[0].contentRect
    //
    //   console.log('width:::', width);
    //   console.log('width:::', width - convertRemToPixels(0.75) - 1);
    //   winLossBankChart.rescale(
    //       width - convertRemToPixels(0.75) - 1,
    //       height - convertRemToPixels(0.75) - 1
    //   );
    // })
  }
}
</script>
