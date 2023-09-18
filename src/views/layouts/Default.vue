<template>
  <div v-if="isMobile" class="bg-gradient-to-bl from-accent-150 via-green-700 to-green-900 h-screen">
    <div class="flex flex-row text-gray-300">
      <div class="spin-history bg-green-900" style="min-width: 21px;">
        <spin-history-bar />
      </div>
      <div class="flex flex-col w-full h-screen pb-4">

        <div class="header py-2 px-3 flex flex-row justify-between items-center gap-6 bg-gradient-to-tr from-green-700 via-green-800 to-green-800">
          <display-stats />
          <current-bet class="font-lobster text-gray-200 text-xl lg:text-3xl" />
          <div class="flex gap-4 text-lg">
            <font-awesome-icon icon="fa-solid fa-house" />
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            <font-awesome-icon icon="fa-solid fa-plus" />
            <font-awesome-icon icon="fa-solid fa-gear" />
          </div>
        </div>

        <div class="board flex flex-row basis-0 gap-4 pr-4 pt-2">
          <div class="flex flex-col gap-2">
            <red-black-chart :screen-size="current" />
            <even-odd-chart :screen-size="current" />
            <twelves-chart :screen-size="current" />
            <spin-rounds-mobile />
          </div>
          <div class="flex flex-col">
            <table-limits-mobile />
            <div class="relative">
              <board :selected-chip="selectedChip" :screen-size="current" />
              <div class="absolute bottom-10 right-3 flex flex-col gap-5">
                <font-awesome-icon class="text-2xl icon-shadow" icon="fa-solid fa-keyboard" />
                <font-awesome-icon class="text-2xl icon-shadow" icon="fa-solid fa-chart-column" />
              </div>
            </div>
            <div class="game-control flex justify-end gap-5">
              <div class="flex flex-col gap-4">
                <clear-bets-button />
                <undo-last-bet-button />
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

    <slide-panel
        class="relative"
        :show="showPanel"
        @close="showPanel = !showPanel"
    />

  </div>
  <div v-else-if="isTabletDimensions">
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header
          @show="showPanel = true"
      />
      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto text-gray-300">
        <!-- Narrow sidebar-->
        <side-nav />
        <div class="flex flex-col">
          <div class="flex">
            <div class="flex flex-col">
              <this-round />
              <winning-numbers />
            </div>
            <div class="flex flex-col">
              <div class="flex">
                <spin-rounds-mobile />
                <spin-history-bar />
                <radial-wheel-chart />
                <div class="flex flex-col">
                  <red-black-chart  />
                  <even-odd-chart  />
                </div>
                <div class="flex flex-col">
                  <twelves-chart />
                </div>
              </div>
              <div class="flex flex-col">
                <win-probability />
                <coverage-table />
              </div>
              <div class="flex flex-col">
                <table-limits />
                <div>
                  <board :selected-chip="selectedChip" :screen-size="current" />
                </div>
              </div>
            </div>
          </div>
          <div>
            Bottom
            <spin-button />
            <clear-bets-button />
            <replay-last-bet-button />
            <double-bet-button />
            <undo-last-bet-button />
            <chip-selection-panel />
          </div>
        </div>
      </div>
      <slide-panel
          class="relative"
          :show="showPanel"
          @close="showPanel = !showPanel"
      />
      <!--      <base-modal/>-->
    </div>
  </div>
  <div v-else>
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header
          @show="showPanel = true"
      />
      <h2 v-if="isTabletDimensions" class="text-gray-200">You can see me!</h2>
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
import { ref, onMounted, inject, computed } from 'vue'
import {mapGetters, useStore} from "vuex"
import Board from "@/components/Board.vue"
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
import TwelvesChart from "@/components/charts/TwelvesChart.vue";
import UndoLastBetButton from "@/components/buttons/UndoLastBetButton.vue";
import SaveGameButton from "@/components/buttons/SaveGameButton.vue";
import NewGameButton from "@/components/buttons/NewGameButton.vue";
import { useBreakpoints, useScreenOrientation, useMediaQuery } from "@vueuse/core"
import ThisRound from "@/components/ThisRound.vue";
import WinningNumbers from "@/components/WinningNumbers.vue";
import TableLimits from "@/components/TableLimits.vue";
import CoverageTable from "@/components/CoverageTable.vue";
import SpinHistory from "@/components/SpinHistory.vue";
import WinProbability from "@/components/WinProbability.vue";


export default {
  name: 'App',
  components: {
    WinProbability,
    SpinHistory,
    CoverageTable,
    TableLimits,
    WinningNumbers,
    ThisRound,
    NewGameButton,
    SaveGameButton,
    UndoLastBetButton,
    TwelvesChart,
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
    const isMobile = inject('isMobile')

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

    // console.log('screensize::xs', xs.value)
    // console.log('screensize::sm', sm.value)
    // console.log('screensize::lg', lg.value)
    // console.log('current::', current.value)

    console.log('isMobile:::::', isMobile)

    if (isMobile) {
      const {
        isSupported,
        orientation,
        angle,
        lockOrientation,
        unlockOrientation,
      } = useScreenOrientation()

      // console.log('isSupported::', isSupported)
      console.log('orientation::', orientation)

      // lockOrientation('portrait-primary')
    }

    onMounted(async () => {
      if (!store.getters['user/isAuthenticated']) {
        await store.dispatch('user/setUserFromToken')
      }
    })

    const isTabletWidth = useMediaQuery('(max-width: 1180px')
    const isTabletHeight = useMediaQuery('(max-height: 820px')

    console.log('isTabletWidth::', isTabletWidth.value)
    console.log('isTabletHeight::', isTabletHeight.value)

    const isTabletDimensions = computed(() => {
      console.log('isTabletDimension::computed', isTabletWidth.value && isTabletHeight.value)
      return isTabletWidth.value && isTabletHeight.value
    })

    console.log('isTabletDimensions::', isTabletDimensions.value)

    return {
      showPanel,
      xs, sm, md, lg,
      current,
      isMobile,
      isTabletDimensions
    }
  },
  computed: {
    ...mapGetters('simulation', ['selectedChip'])
  }
}
</script>
