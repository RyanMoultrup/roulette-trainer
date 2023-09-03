<template>
  <div class="relative h-full bs-class" ref="winLossBankChart">
    <chart-placeholder
        icon="fa-solid fa-chart-area"
        title="Wins Losses & Bank"
        :show-placeholder="showPlaceholder"
    >
      <div id="win-loss-chart" class=""></div>
    </chart-placeholder>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { redrawAll } from "dc";
import WinLossBankChart from "@/lib/charts/WinLossBankChart";
import { debounce } from "@/lib/Utils";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
import { useResizeObserver } from "@vueuse/core";

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
    const winLossBankRef = this.$refs.winLossBankChart;

    winLossBankChart
        .parentHeight(null)
        .parentWidth(null)
        .render(outcomes);

    const chartPercentOfWidth = winLossBankRef.clientWidth / window.innerWidth
    const chartPercentOfHeight = winLossBankRef.clientHeight / window.innerHeight
    let lastResizeWidth = window.innerWidth
    let lastResizeHeight = window.innerHeight

    const getChartSize = (context, args) => {
      const newWindowWidth = context.target.innerWidth
      const newWindowHeight = context.target.innerHeight
      let chartWidth
      let chartHeight


      chartWidth = (newWindowWidth < lastResizeWidth)
          ? newWindowWidth * chartPercentOfWidth
          : winLossBankRef.clientWidth

      chartHeight = (newWindowHeight < lastResizeHeight)
          ? newWindowHeight * chartPercentOfHeight
          : winLossBankRef.clientHeight


      lastResizeWidth = newWindowWidth
      lastResizeHeight = newWindowHeight

      winLossBankChart.rescale(chartWidth, chartHeight)
    }

    window.onresize = debounce(getChartSize, 300)

    // const debounceChartResize = chart => {
    //   console.log('chart::', chart)
    //   return debounce(([{ contentRect: { width, height }}]) => {
    //     console.log('width::', width)
    //     console.log('height::', height)
    //     return chart.rescale(width, height)
    //   }, 300)
    // }
    //
    // useResizeObserver(this.$refs.winLossBankChart, debounceChartResize(winLossBankChart));
  },
  unmounted() {
    unsubscribe()
    winLossBankChart.reset()
  }
}
</script>