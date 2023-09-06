<template>
  <div class="relative" ref="twelveChartRef">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="twelves-chart" class="h-full" ref="evenOddChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import {redrawAll} from "dc"
import { mapGetters } from "vuex"
import Twelves from "@/lib/charts/Twelves.js"
import chartResize from "@/lib/charts/ChartResize"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"

let unsubscribe
let twelvesChart

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true,
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes'])
  },
  mounted () {
    unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false
        redrawAll()
      }
    })

    const outcomes = this.getOutcomes()
    const twelveChartRef = this.$refs.twelveChartRef
    const initWidth = window.innerWidth * 0.09
    const initHeight = window.innerHeight * 0.12

    twelvesChart = new Twelves()
    twelvesChart
        .parentHeight(initHeight)
        .parentWidth(initWidth)
        .render(outcomes)

    addEventListener('resize', chartResize(twelvesChart, twelveChartRef))
  },
  unmounted() {
    unsubscribe()
    twelvesChart.reset()
  }
}
</script>