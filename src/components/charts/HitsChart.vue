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
import { redrawAll } from "dc"
import { mapGetters } from "vuex"
import HitsChart from "@/lib/charts/HitsChart.js"
import chartResize from "@/lib/charts/ChartResize"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"
import { useScreenSize } from "@/composables/useScreenSize";

let unsubscribe
let hitsChart

const calculateSizeFromScreen = (screenSize) => {
  if (screenSize.includes('md') || screenSize.includes('lg')) {
    console.log('large screen')
    return {
      width: window.innerWidth * 0.09,
      height: window.innerHeight * 0.09
    }
  }

  if (screenSize.includes('sm') || screenSize.includes('xs')) {
    console.log('small SCREEN::')
    return {
      width: window.innerWidth * 0.18,
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

    const { width, height } = calculateSizeFromScreen(this.screenSize)

    console.log('hitschart::width', width)
    console.log('hitschart::height', height)

    hitsChart = new HitsChart();
    hitsChart
        .parentHeight(100)
        .parentWidth(width)
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