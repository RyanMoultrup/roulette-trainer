<template>
  <div v-if="sm || xs">
    <div class="flex flex-row text-gray-300">
      <div class="spin-history">
        <spin-history-bar />
      </div>
      <div class="flex flex-col p-3">
        <div class="header flex flex-row gap-6">
          <display-stats />
          <current-bet class="text-gray-200 text-xl lg:text-3xl" />
        </div>
        <div class="board flex flex-row basis-0">
          <div class="flex flex-col gap-2">
            <red-black-chart :screen-size="current" />
            <even-odd-chart :screen-size="current" />
            <spin-rounds-mobile />
          </div>
          <div class="flex flex-col">
            <table-limits-mobile />
            <board :selected-chip="selectedChip" />
            <div class="game-control flex justify-end gap-5">
              <div class="flex flex-col">
                <clear-bets-button />
              </div>
              <chip-selection-panel />
              <div class="flex flex-col gap-4">
                <replay-last-bet-button />
                <double-bet-button />
              </div>
              <spin-button />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div v-else>
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header
          @show="showPanel = true"
      />
      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto">
        <!-- Narrow sidebar-->
        <side-nav />
        <slot></slot>
      </div>
      <slide-panel
          class="relative"
          :show="showPanel"
          @close="showPanel = !showPanel"
      />
<!--      <base-modal/>-->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {mapGetters, useStore} from "vuex"
import Board from "@/components/Board.vue"
import { useBreakpoints } from "@vueuse/core"
import SideNav from "@/components/ui/SideNav.vue"
import BaseModal from "@/components/ui/Base/BaseModal.vue"
import SpinHistoryBar from "@/components/SpinHistoryBar.vue"
import SpinButton from "@/components/buttons/SpinButton.vue"
import SlidePanel from "@/components/slide-panes/Settings.vue"
import { default as AppHeader } from "@/components/ui/Header.vue"
import ChipSelectionPanel from "@/components/ChipSelectionPanel.vue"
import ClearBetsButton from "@/components/buttons/ClearBetsButton.vue"
import DoubleBetButton from "@/components/buttons/DoubleBetButton.vue"
import ReplayLastBetButton from "@/components/buttons/ReplayLastBetButton.vue"
import DisplayStats from "@/components/DisplayStats.vue"
import CurrentBet from "@/components/CurrentBet.vue";
import RedBlackChart from "@/components/charts/RedBlackChart.vue";
import EvenOddChart from "@/components/charts/EvenOddChart.vue";
import TableLimitsMobile from "@/components/TableLimitsMobile.vue";
import RadialWheelChart from "@/components/charts/RadialWheelChart.vue";
import SpinRoundsMobile from "@/components/SpinRoundsMobile.vue";

export default {
  name: 'App',
  components: {
    SpinRoundsMobile,
    RadialWheelChart,
    TableLimitsMobile,
    EvenOddChart,
    RedBlackChart,
    CurrentBet,
    DisplayStats,
    DoubleBetButton,
    ClearBetsButton,
    ReplayLastBetButton,
    ChipSelectionPanel, SpinButton, SpinHistoryBar, Board, SlidePanel, AppHeader, SideNav, BaseModal },
  setup () {
    const showPanel = ref(false)
    const store = useStore()

    const breakpoints =  useBreakpoints({
      xs: 640,
      sm: 897,
      md: 1024,
      lg: 1920
    })

    const current = breakpoints.current()
    // const xs = breakpoints.smallerOrEqual('xs')
    // const xse = breakpoints.smallerOrEqual('sm')
    // const sm = breakpoints.between('xs', 'sm')
    // const md = breakpoints.between('md', 'lg')
    // const lg = breakpoints.between('lg', 'xl')
    // const xl = breakpoints.between('xl', '2xl')
    // const xxl = breakpoints['2xl']

    const xs = breakpoints.smallerOrEqual('xs')
    const sm = breakpoints.between('xs', 'sm')
    const md = breakpoints.between('md', 'lg')
    const lg = breakpoints.greaterOrEqual('lg')

    // const point = [xs, sm, md, lg].filter(b => b.value)
    // console.log('current::filter', point)

    console.log('screensize::xs', xs.value)
    console.log('screensize::sm', sm.value)
    console.log('screensize::lg', lg.value)
    console.log('current::', current.value)

    onMounted(async () => {
      if (!store.getters['user/isAuthenticated']) {
        await store.dispatch('user/setUserFromToken')
      }
    })

    return {
      showPanel,
      xs, sm, md, lg,
      current
    }
  },
  computed: {
    ...mapGetters('simulation', ['selectedChip'])
  }
}
</script>
