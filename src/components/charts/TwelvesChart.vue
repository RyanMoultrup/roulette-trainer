<template>
  <div class="relative">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="twelves-chart" class="h-full" ref="evenOddChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { debounce } from "@/lib/Utils";
import Twelves from "@/lib/charts/Twelves.js";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
import {redrawAll} from "dc";

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

    twelvesChart = new Twelves()
    twelvesChart
        .parentHeight(100)
        .parentWidth(175)
        // .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        // .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes)

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)
    // useResizeObserver(this.$refs.hitsChart, debounceChartResize(hitsChart));
  },
  unmounted() {
    unsubscribe()
    twelvesChart.reset()
  }
}
</script>