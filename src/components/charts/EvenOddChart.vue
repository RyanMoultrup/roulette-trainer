<template>
  <div class="relative" ref="evenOddRef">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="even-odd-chart" class="h-full" ref="evenOddChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import {redrawAll} from "dc"
import { mapGetters } from "vuex"
import EvenOdd from "@/lib/charts/EvenOdd.js"
import chartResize from "@/lib/charts/ChartResize"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"

let unsubscribe
let evenOddChart

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

    const outcomes = this.getOutcomes()
    const evenOddRef = this.$refs.evenOddRef
    const { width, height } = calculateSizeFromScreen(this.screenSize)

    evenOddChart = new EvenOdd("#even-odd-chart")
    evenOddChart
        .parentWidth(width)
        .parentHeight(height)
        .render(outcomes)

    addEventListener('resize', this.chartResizer(evenOddChart, evenOddRef))
  },
  unmounted() {
    unsubscribe()
    evenOddChart.reset()
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>