<template>
  <div class="relative" ref="hitsChartRef">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="hits-chart" class="h-full" ref="hitsChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import { redrawAll } from "dc";
import { mapGetters } from "vuex";
import { debounce } from "@/lib/Utils";
import HitsChart from "@/lib/charts/HitsChart.js";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";

let unsubscribe
let hitsChart

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true,
      height: null,
      width: null
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes'])
  },
  mounted () {
    unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll();
      }
    })

    const outcomes = this.getOutcomes();
    const hitsChartRef = this.$refs.hitsChartRef;

    hitsChart = new HitsChart();
    hitsChart
        .parentHeight(100)
        .parentWidth(null)
        // .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        // .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

    const chartPercentOfWidth = 175 / window.innerWidth
    const chartPercentOfHeight = 100 / window.innerHeight
    let lastResizeWidth = window.innerWidth
    let lastResizeHeight = window.innerHeight

    const getChartSize = (context, args) => {
      console.log('HITS CHART RESIZE::')
      const newWindowWidth = context.target.innerWidth
      const newWindowHeight = context.target.innerHeight
      let chartWidth
      let chartHeight


      chartWidth = (newWindowWidth < lastResizeWidth)
          ? newWindowWidth * chartPercentOfWidth
          : hitsChartRef.clientWidth

      chartHeight = (newWindowHeight < lastResizeHeight)
          ? newWindowHeight * chartPercentOfHeight
          : hitsChartRef.clientHeight


      lastResizeWidth = newWindowWidth
      lastResizeHeight = newWindowHeight

      console.log('chartWidth::', chartWidth)
      // console.log('chartHeight::', chartHeight)

      hitsChart.rescale(chartWidth, chartHeight)
    }

    addEventListener('resize', debounce(getChartSize, 300))

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)
    // useResizeObserver(this.$refs.hitsChart, debounceChartResize(hitsChart));
  },
  unmounted() {
    unsubscribe()
    hitsChart.reset()
  }
}
</script>
<style>
#hits-chart g.axis.x g.tick:nth-child(2n+1) { display:none }
</style>