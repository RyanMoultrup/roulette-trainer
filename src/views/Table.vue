<template>
    <span class="text-gray-400" @click="updateChart">I can see it</span>
    <div id="radial-wheel"></div>
</template>

<script>
// import * as d3 from 'd3'
import { onMounted } from "vue"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"

const color = ['green', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black']
const nums = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const rouletteData = nums.map(d => ({ number: d }))
const randomHits = rouletteData.map(() => Math.floor(Math.random() * 100))
const moreRandomeHits = () => Math.floor(Math.random() * 37) + 1

export default {
  components: {  },
  setup () {
    let chart

    const updateChart = () => {
      // console.log('updating chart?:::::', moreRandomeHits())
      chart.update(moreRandomeHits())
    }

    onMounted(() => {
      // Create an SVG element to hold the chart
      // const wheelChart = new RadialWheelChart
      // wheelChart.render()
      chart = new RadialWheelChart('#radial-wheel');
      chart.setData(nums, randomHits);
      chart.render();
    })

    return {
      updateChart
    }
  }
}

</script>

<style scoped>

</style>