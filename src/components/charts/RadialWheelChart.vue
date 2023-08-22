<template>
<!--    <span class="text-gray-400" @click="updateChart">I can see it</span>-->
    <div id="radial-wheel"></div>
</template>

<script>
import { useStore } from "vuex"
import { onMounted, computed, watch } from "vue"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"
const moreRandomeHits = () => Math.floor(Math.random() * 37) + 1

export default {
  components: {  },
  setup () {
    const store = useStore()
    let chart

    const hit = computed(() => {
      return store.getters['simulation/getSpin']
    })

    watch(hit, (newVal) => {
      chart.update(newVal)
    })

    // const updateChart = () => {
    //   chart.update(moreRandomeHits())
    // }

    onMounted(() => {
      chart = new RadialWheelChart('#radial-wheel')
      chart.render()
    })

    return {
      // updateChart
    }
  }
}

</script>

<style scoped>

</style>