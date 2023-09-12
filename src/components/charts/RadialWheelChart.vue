<template>
  <div ref="chartRef">
    <div id="radial-wheel"></div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import chartResize from "@/lib/charts/ChartResize"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"
import { onMounted, onUnmounted, computed, watch, ref } from "vue"

const calculateSizeFromScreen = (screenSize) => {
  if (screenSize.includes('sm') || screenSize.includes('lg')) {
    return {
      width: window.innerWidth * 0.13,
      height: window.innerHeight * 0.13
    }
  }

  if (screenSize.includes('sm') || screenSize.includes('xs')) {
    return {
      width: window.innerWidth * 0.19,
      height: window.innerHeight * 0.2
    }
  }
}

export default {
  components: {  },
  props: {
    screenSize: {
      type: Array,
      default: ['lg']
    }
  },
  setup (props) {
    const store = useStore()
    let chart
    const { width } = calculateSizeFromScreen(props.screenSize)

    let chartWidth = ref(width)
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

    onUnmounted(() => {
      window.removeEventListener('resize', chartResizer)
    })

    return { chartRef }
  }
}
</script>
