<template>
    <span class="text-gray-400" @click="updateChart">I can see it</span>
    <div id="radial-wheel"></div>
</template>

<script>
import { onMounted } from "vue"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"
const moreRandomeHits = () => Math.floor(Math.random() * 37) + 1

export default {
  components: {  },
  setup () {
    let chart

    const updateChart = () => {
      chart.update(moreRandomeHits())
    }

    onMounted(() => {
      chart = new RadialWheelChart('#radial-wheel');
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