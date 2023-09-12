<template>
  <div class="relative" ref="redBlackRef">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="red-black-chart" class="h-full" ref="redBlackChart"></div>
    </chart-placeholder>
  </div>
</template>

<script>
import { redrawAll } from "dc"
import { mapGetters } from "vuex"
import RedBlack from "@/lib/charts/RedBlack.js"
import chartResize from "@/lib/charts/ChartResize"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"

let unsubscribe
let redBlackChart

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
      height: window.innerHeight * 0.2
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

    const outcomes = this.getOutcomes();
    const redBlackRef = this.$refs.redBlackRef
    const { width, height } = calculateSizeFromScreen(this.screenSize)

    redBlackChart = new RedBlack('#red-black-chart');
    redBlackChart
        .parentHeight(height)
        .parentWidth(width)
        .render(outcomes)

    addEventListener('resize', this.chartResizer(redBlackChart, redBlackRef))
  },
  unmounted() {
    unsubscribe()
    redBlackChart.reset()
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>