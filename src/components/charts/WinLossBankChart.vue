<template>
  <div class="relative">
    <chart-placeholder
        icon="fa-solid fa-chart-area"
        title="Wins Losses & Bank"
        :show-placeholder="showPlaceholder"
    >
      <div id="win-loss-chart" class="h-full" ref="winLossBankChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {redrawAll} from "dc";
import WinLossBankChart from "@/lib/charts/WinLossBankChart";
import {debounce} from "@/lib/Utils";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";

let unsubscribe
let winLossBankChart

export default {
  components: { ChartPlaceholder },
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
    unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll();
      }
    })

    const outcomes = this.getOutcomes();

    winLossBankChart = new WinLossBankChart();
    // const winLossBankRef = this.$refs.winLossBankChart;
    winLossBankChart
        // .parentHeight(winLossBankRef.clientHeight - 20)
        // .parentWidth(winLossBankRef.clientWidth - 20)
        .parentHeight(null)
        .parentWidth(null)
        .render(outcomes);

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)

    // useResizeObserver(this.$refs.winLossBankChart, debounceChartResize(winLossBankChart));
  },
  unmounted() {
    unsubscribe()
    winLossBankChart.reset()
  }
}
</script>