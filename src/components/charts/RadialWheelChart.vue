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
    const hit = computed(() => store.getters['simulation/getSpin'])

    watch(hit, (newVal) => chart.update())

    onMounted(() => {
      chart = new RadialWheelChart('#radial-wheel')
      chart.domain(hits).render()
    })
  }
}

</script>
