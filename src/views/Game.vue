<template>
  <div class="layout-container flex-1">

    <spins-table />
    <betting-table-review />

    <div class="flex flex-col justify-between bg-green-800 gap-3 p-3">
      <div class="font-lobster text-2xl text-gray-400">Spin History</div>
      <div class="flex flex-row gap-3">
        <!--              <span class="font-lobster">Outside</span>-->
        <div class="flex flex-col gap-3">
          <red-black-chart />
          <even-odd-chart />
        </div>
        <div class="flex flex-col gap-3">
          <twelves-chart />
          <half-board-chart />
        </div>
      </div>

      <hits-chart class="bet-display" />
    </div>

    <active-game-charts />
  </div>
</template>
<script>
import SpinsTable from "@/components/SpinsTable.vue"
import HalfBoardChart from "@/components/charts/HalfBoardChart.vue"
import EvenOddChart from "@/components/charts/EvenOddChart.vue"
import RedBlackChart from "@/components/charts/RedBlackChart.vue"
import HitsChart from "@/components/charts/HitsChart.vue"
import TwelvesChart from "@/components/charts/TwelvesChart.vue"
import ActiveGameCharts from "@/components/ActiveGameCharts.vue"
import BettingTableReview from "@/components/betting-table/BettingTableReview.vue"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"
import SlidePanel from "@/components/ui/SlidePanel.vue"
import BetsDisplayPanel from "@/components/BetsDisplayPanel.vue"
import DisplayStats from "@/components/DisplayStats.vue"
import BaseModal from "@/components/ui/Base/BaseModal.vue"
import { game } from "@/api";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    HalfBoardChart,
    TwelvesChart,
    EvenOddChart,
    RedBlackChart,
    ChartPlaceholder,
    SlidePanel,
    BetsDisplayPanel,
    SpinsTable,
    BettingTableReview,
    DisplayStats,
    ActiveGameCharts,
    HitsChart,
    BaseModal
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    console.log('route::', route)
    const gameId = ref(route.params.gameId).value

    // const fetchGame = async () => {
    //   return await game.get(gameId)
    // }

    console.log('gameId::', gameId)
    game.get(gameId).then(async ({ status, data: { data: { outcomes } } }) => {
      console.log('games API status::', status)
      console.log('games API outcomes::', outcomes)
      await store.commit('simulation/addOutcome', outcomes)

      console.log(store.getters['simulation/getOutcomes'].all())
    })


    return {}
  }
}
</script>