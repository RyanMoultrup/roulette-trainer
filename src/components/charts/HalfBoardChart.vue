<template>
  <div class="relative">
    <chart-placeholder
        icon="fa-solid fa-chart-column"
        title="Numbers Hit Each Round"
        :show-placeholder="showPlaceholder" >
      <div id="half-board-chart" class="h-full" ref="evenOddChart"></div>
    </chart-placeholder>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { debounce } from "@/lib/Utils";
import HalfBoardSpots from "@/lib/charts/HalfBoardSpots.js";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
import {redrawAll} from "dc";

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: false,
    }
  },
  methods: {
    ...mapGetters('simulation', ['getOutcomes'])
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.showPlaceholder = false;
        redrawAll()
      }
    })

    const outcomes = this.getOutcomes();

    const evenOddChart = new HalfBoardSpots();
    evenOddChart
        .parentHeight(100)
        .parentWidth(175)
        // .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        // .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

    // const debounceChartResize = chart => debounce(([{ contentRect: { width, height }}]) => chart.rescale(width, height), 300)
    // useResizeObserver(this.$refs.hitsChart, debounceChartResize(hitsChart));
  }
}
</script>