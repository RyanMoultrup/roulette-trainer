<template>
  <div ref="chartRef">
    <div id="radial-wheel"></div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import chartResize from "@/lib/charts/ChartResize"
import { onMounted, computed, watch, ref } from "vue"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"

export default {
  components: {  },
  setup () {
    const store = useStore()
    let chart
    let chartWidth = ref(window.innerWidth * 0.13)
    const chartRef = ref(null)
    const chartResizer = chartResize

    const hits = store.getters['simulation/getOutcomes']
    const hit = computed(() => store.getters['simulation/getSpin'])

    watch(hit, (newVal) => chart.update())

    onMounted(async () => {
      chart = new RadialWheelChart('#radial-wheel')
      chart
          .domain(hits)
          .width(chartWidth.value)
          .render()

      addEventListener('resize', chartResizer(chart, chartRef.value))
    })

    return { chartRef }
  }
}
</script>
