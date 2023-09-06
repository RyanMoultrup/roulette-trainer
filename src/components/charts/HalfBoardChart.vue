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

let unsubscribe
let halfBoardSpots

export default {
  components: { ChartPlaceholder },
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
    const initWidth = window.innerWidth * 0.09
    const initHeight = window.innerHeight * 0.12

    halfBoardSpots = new HalfBoardSpots('#half-board-chart')
    halfBoardSpots
        .parentHeight(initHeight)
        .parentWidth(initWidth)
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