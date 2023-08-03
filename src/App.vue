<template>
  <div>
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header
        @show="showPanel = true"
      />
      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto">
        <!-- Narrow sidebar-->
        <side-nav />

        <div class="layout-container flex-1">
          <spins-table />
          <betting-table />

          <div class="flex flex-col justify-between bg-green-800 gap-2 p-3">
            <div class="font-lobster text-2xl text-gray-400">Spin History</div>
            <div class="flex flex-row gap-2">
<!--              <span class="font-lobster">Outside</span>-->
              <div class="flex flex-col gap-2">
                <red-black-chart />
                <even-odd-chart />
              </div>
              <div class="flex flex-col gap-2">
                <twelves-chart />
                <half-board-chart />
              </div>
            </div>

            <hits-chart class="bet-display" />
          </div>

          <active-game-charts />
        </div>
      </div>
      <slide-panel
        class="relative"
        :show="showPanel"
        @close="showPanel = !showPanel"
      />
    </div>
  </div>
</template>

<script>

import SideNav from "@/components/ui/SideNav.vue";
import SpinsTable from "@/components/SpinsTable.vue";
import BettingTable from "@/components/BettingTable.vue";
import DisplayStats from "@/components/DisplayStats.vue";
import ActiveGameCharts from "@/components/ActiveGameCharts.vue";
import BetsDisplayPanel from "@/components/BetsDisplayPanel.vue";
import { default as AppHeader } from "@/components/ui/Header.vue";
import SlidePanel from "@/components/ui/SlidePanel.vue";
import ChartPlaceholder from "@/components/charts/ChartPlaceholder.vue";
import HitsChart from "@/components/charts/HitsChart.vue";
import RedBlackChart from "@/components/charts/RedBlackChart.vue";
import EvenOddChart from "@/components/charts/EvenOddChart.vue";
import TwelvesChart from "@/components/charts/TwelvesChart.vue";
import HalfBoardChart from "@/components/charts/HalfBoardChart.vue";

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
    AppHeader,
    SideNav,
    HitsChart
  },
  data () {
    return {
      showPanel: false
    }
  }
}
</script>
