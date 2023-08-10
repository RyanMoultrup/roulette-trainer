<template>
  <div class="layout-container flex-1">

    <spins-table />
    <betting-table />

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
import BettingTable from "@/components/BettingTable.vue"
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue"
import SlidePanel from "@/components/ui/SlidePanel.vue"
import BetsDisplayPanel from "@/components/BetsDisplayPanel.vue"
import DisplayStats from "@/components/DisplayStats.vue"
import BaseModal from "@/components/ui/Base/BaseModal.vue"

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
    BettingTable,
    DisplayStats,
    ActiveGameCharts,
    HitsChart,
    BaseModal
  },
  data () {
    return {
      showPanel: false
    }
  }
}
</script>