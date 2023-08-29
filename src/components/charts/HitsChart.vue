<template>
  <div class="relative">
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

    hitsChart = new HitsChart();
    hitsChart
        .parentHeight(100)
        .parentWidth(null)
        // .parentHeight(this.$refs.hitsChart.clientHeight - 30)
        // .parentWidth(this.$refs.hitsChart.clientWidth - 40)
        .render(outcomes);

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