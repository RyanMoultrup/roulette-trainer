<template>
    <div id="radial-wheel"></div>
</template>

<script>
import { useStore } from "vuex"
import { onMounted, computed, watch } from "vue"
import RadialWheelChart from "@/lib/charts/RadialWheelChart"

export default {
  components: {  },
  setup () {
    const store = useStore()
    let chart

    const hits = store.getters['simulation/getOutcomes']

    console.log('hits::', hits)

    const hit = computed(() => {
      return store.getters['simulation/getSpin']
    })

    watch(hit, (newVal) => {
      console.log('watching hit:::')
      chart.update()
    })

    // const updateChart = () => {
    //   chart.update(moreRandomeHits())
    // }

    onMounted(() => {
      chart = new RadialWheelChart('#radial-wheel')
      chart.domain(hits).render()
    })
  }
}

</script>

<style scoped>

</style>