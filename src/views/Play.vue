<template>
  <div class="layout-container flex-1">

    <spins-table />
    <betting-table />

    <spin-history />

    <active-game-charts grid-class="charts" />
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
import SpinHistory from "@/components/SpinHistory.vue";

export default {
  name: 'App',
  components: {
    SpinHistory,
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