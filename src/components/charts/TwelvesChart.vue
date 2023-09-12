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

const calculateSizeFromScreen = (screenSize) => {
  if (screenSize.includes('md') || screenSize.includes('lg')) {
    return {
      width: window.innerWidth * 0.09,
      height: window.innerHeight * 0.09
    }
  }

  if (screenSize.includes('sm') || screenSize.includes('xs')) {
    return {
      width: window.innerWidth * 0.14,
      height: window.innerHeight * 0.15
    }
  }
}

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true,
      chartResizer: chartResize
    }
  },
  props: {
    screenSize: {
      type: Array,
      default: ['lg']
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
    const { width, height } = calculateSizeFromScreen(this.screenSize)

    twelvesChart = new Twelves('#twelves-chart')
    twelvesChart
        .parentHeight(height)
        .parentWidth(width)
        .render(outcomes)

    addEventListener('resize', this.chartResizer(twelvesChart, twelveChartRef))
  },
  unmounted() {
    unsubscribe()
    twelvesChart.reset()
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>