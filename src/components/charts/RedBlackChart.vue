<template>
  <div class="relative">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        :show-placeholder="showPlaceholder" >
      <div id="red-black-chart" class="h-full" ref="redBlackChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { debounce } from "@/lib/Utils";
import RedBlack from "@/lib/charts/RedBlack.js";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
import { redrawAll } from "dc";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

let unsubscribe
let redBlackChart

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
        this.showPlaceholder = false;
        redrawAll()
      }
    })

    const outcomes = this.getOutcomes();

    redBlackChart = new RedBlack();
    redBlackChart
        .parentHeight(100)
        .parentWidth(175)
        // .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        // .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)
    // useResizeObserver(this.$refs.hitsChart, debounceChartResize(hitsChart));
  },
  unmounted() {
    unsubscribe()
    redBlackChart.reset()
  }
}
</script>