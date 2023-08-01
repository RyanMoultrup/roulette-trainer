<template>
  <div id="win-loss-chart" class="p-4 h-full" ref="winLossBankChart"></div>
</template>
<script>
import {mapGetters} from "vuex";
import {redrawAll} from "dc";
import WinLossBankChart from "@/lib/charts/WinLossBankChart";
import {debounce} from "@/lib/Utils";

export default {
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

    const outcomes = this.getOutcomes();

    const winLossBankChart = new WinLossBankChart();
    // const winLossBankRef = this.$refs.winLossBankChart;
    winLossBankChart
        // .parentHeight(winLossBankRef.clientHeight - 20)
        // .parentWidth(winLossBankRef.clientWidth - 20)
        .parentHeight(125)
        .parentWidth(null)
        .render(outcomes);

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)

    // useResizeObserver(this.$refs.winLossBankChart, debounceChartResize(winLossBankChart));
  }
}
</script>