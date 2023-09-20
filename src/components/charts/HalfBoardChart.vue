<template>
  <div class="relative" ref="halfBoardRef">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="half-board-chart" class="h-full" ref="halfBoardChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import {redrawAll} from "dc"
import { mapGetters } from "vuex"
import chartResize from "@/lib/charts/ChartResize"
import HalfBoardSpots from "@/lib/charts/HalfBoardSpots.js"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"
import { useScreenSize } from "@/composables/useScreenSize";

let unsubscribe
let halfBoardSpots

const calculateSizeFromScreen = (screenSize) => {
  if (screenSize.includes('lg')) {
    return {
      width: window.innerWidth * 0.09,
      height: window.innerHeight * 0.09
    }
  }

  if (screenSize.includes('md')) {
    return {
      width: window.innerWidth * 0.15,
      height: window.innerHeight * 0.1
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
  props: {
    ...useScreenSize()
  },
  data () {
    return {
      showPlaceholder: true,
      chartResizer: chartResize
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes'])
  },
  mounted () {
    unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll()
      }
    })

    const outcomes = this.getOutcomes()
    const halfBoardRef = this.$refs.halfBoardRef
    const { width, height } = calculateSizeFromScreen(this.screenSize)

    halfBoardSpots = new HalfBoardSpots('#half-board-chart')
    halfBoardSpots
        .parentHeight(height)
        .parentWidth(width)
        .render(outcomes);

    addEventListener('resize', this.chartResizer(halfBoardSpots, halfBoardRef))
  },
  unmounted() {
    unsubscribe()
    halfBoardSpots.reset()
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>