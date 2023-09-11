<template>
  <div class="relative" ref="hitsChartRef">
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
import chartResize from "@/lib/charts/ChartResize";

let unsubscribe
let hitsChart

export default {
  components: { ChartPlaceholder },
  data () {
    return {
      showPlaceholder: true,
      height: null,
      width: null,
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
        redrawAll();
      }
    })

    const outcomes = this.getOutcomes();
    const hitsChartRef = this.$refs.hitsChartRef;

    hitsChart = new HitsChart();
    hitsChart
        .parentHeight(100)
        .parentWidth(null)
        .render(outcomes);

    addEventListener('resize', this.chartResizer(hitsChart, hitsChartRef))
  },
  unmounted() {
    unsubscribe()
    hitsChart.reset()
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>
<style>
#hits-chart g.axis.x g.tick:nth-child(2n+1) { display:none }
</style>