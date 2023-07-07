<template>
  <div style="min-height: 768px;">
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header />
      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto">
        <!-- Narrow sidebar-->
        <side-nav />

        <div class="layout-container flex-1">
          <display-stats />
          <spins-table />
          <betting-table />
          <bets-display-panel/>
          <active-game-charts />
        </div>
      </div>
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

export default {
  name: 'App',
  components: { BetsDisplayPanel, SpinsTable, BettingTable, DisplayStats, ActiveGameCharts, AppHeader, SideNav },
}
</script>
