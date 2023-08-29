<template>
  <div class="layout-container flex-1">
    <active-game-charts grid-class="charts" />
    <betting-table grid-class="bottom-left" />
    <spin-history grid-class="side-pane" />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import SpinsTable from "@/components/SpinsTable.vue"
import SpinHistory from "@/components/SpinHistory.vue";
import BettingTable from "@/components/BettingTable.vue"
import ActiveGameCharts from "@/components/ActiveGameCharts.vue"

export default {
  name: 'App',
  components: {
    SpinHistory,
    SpinsTable,
    BettingTable,
    ActiveGameCharts
  },
  data () {
    return {
      showPanel: false
    }
  },
  methods: {
    ...mapActions('strategy', { resetStrategy: 'reset' }),
    ...mapActions('bank', { bankReset: 'reset' }),
    ...mapActions('simulation', { resetSimulation: 'reset' }),
  },
  unmounted() {
    this.resetStrategy();
    this.bankReset();
    this.resetSimulation();
  }
}
</script>