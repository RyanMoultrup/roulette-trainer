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
import { redrawAll } from "dc"
import { mapGetters } from "vuex"
import { debounce } from "@/lib/Utils"
import chartResize from "@/lib/charts/ChartResize"
import WinLossBankChart from "@/lib/charts/WinLossBankChart"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"

let unsubscribe
let winLossBankChart

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true,
      getChartSize: null,
      chartResizer: chartResize
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
        .parentHeight(100)
        .parentWidth(null)
        .render(outcomes);

    // const chartPercentOfWidth = winLossBankRef.clientWidth / window.innerWidth
    // const chartPercentOfHeight = winLossBankRef.clientHeight / window.innerHeight
    // let lastResizeWidth = window.innerWidth
    // let lastResizeHeight = window.innerHeight

    // this.getChartSize = (context, args) => {
    //   const newWindowWidth = context.target.innerWidth
    //   const newWindowHeight = context.target.innerHeight
    //   let chartWidth
    //   let chartHeight
    //
    //
    //   chartWidth = (newWindowWidth < lastResizeWidth)
    //       ? newWindowWidth * chartPercentOfWidth
    //       : winLossBankRef.clientWidth
    //
    //   chartHeight = (newWindowHeight < lastResizeHeight)
    //       ? newWindowHeight * chartPercentOfHeight
    //       : winLossBankRef.clientHeight
    //
    //
    //   lastResizeWidth = newWindowWidth
    //   lastResizeHeight = newWindowHeight
    //
    //   winLossBankChart.rescale(chartWidth, chartHeight)
    // }

    addEventListener('resize', chartResize(winLossBankChart, winLossBankRef))
  },
  unmounted() {
    unsubscribe()
    winLossBankChart.reset()
    window.removeEventListener('resize', this.getChartSize)
  }
}
</script>