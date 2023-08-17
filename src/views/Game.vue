<template>
  <div class="layout-container flex-1">

<!--    <spins-table grid-class="spin-table" />-->
    <betting-table-review grid-class="betting-area" />

    <spin-history />

    <active-game-charts grid-class="charts" />
  </div>
</template>
<script>
import { onUnmounted, ref } from 'vue'
import { game } from "@/api";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SpinsTable from "@/components/SpinsTable.vue"
import SpinHistory from "@/components/SpinHistory.vue";
import ActiveGameCharts from "@/components/ActiveGameCharts.vue"
import BettingTableReview from "@/components/betting-table/BettingTableReview.vue"

export default {
  name: 'App',
  components: {
    SpinsTable,
    SpinHistory,
    ActiveGameCharts,
    BettingTableReview,
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const gameId = ref(route.params.gameId).value

    game.get(gameId).then(async ({ status, data: { data: { outcomes } } }) => {
      await store.commit('simulation/addOutcome', outcomes)
    })

    onUnmounted(() => {
      store.dispatch('simulation/reset')
      store.dispatch('bank/reset')
      store.dispatch('strategy/reset')
    })

    return {}
  }
}
</script>