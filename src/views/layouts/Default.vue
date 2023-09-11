<template>
  <div v-if="sm">
    <div class="flex flex-row text-gray-300">
      <div class="spin-history">
        <spin-history-bar />
      </div>
      <div class="flex flex-col">
        <div class="header">The header</div>
        <div class="board">
          <board :selected-chip="selectedChip" />
        </div>
        <div class="game-control flex">
          <div class="flex flex-col">
            <clear-bets-button />
          </div>
          <chip-selection-panel />
          <div class="flex flex-col">
            <replay-last-bet-button />
            <double-bet-button />
          </div>
          <spin-button />
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
import {mapGetters, useStore} from "vuex";
import { ref, onMounted, reactive } from 'vue'
import SideNav from "@/components/ui/SideNav.vue";
import SlidePanel from "@/components/slide-panes/Settings.vue";
import BaseModal from "@/components/ui/Base/BaseModal.vue";
import { default as AppHeader } from "@/components/ui/Header.vue";
import { useBreakpoints } from "@vueuse/core";
import Board from "@/components/Board.vue";
import SpinHistoryBar from "@/components/SpinHistoryBar.vue";
import SpinButton from "@/components/buttons/SpinButton.vue";
import ChipSelectionPanel from "@/components/ChipSelectionPanel.vue";
import ReplayLastBetButton from "@/components/buttons/ReplayLastBetButton.vue";
import ClearBetsButton from "@/components/buttons/ClearBetsButton.vue";
import DoubleBetButton from "@/components/buttons/DoubleBetButton.vue";

export default {
  name: 'App',
  components: {
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

    // const current = breakpoints.current()
    // const xs = breakpoints.smallerOrEqual('xs')
    // const xse = breakpoints.smallerOrEqual('sm')
    // const sm = breakpoints.between('xs', 'sm')
    // const md = breakpoints.between('md', 'lg')
    // const lg = breakpoints.between('lg', 'xl')
    // const xl = breakpoints.between('xl', '2xl')
    // const xxl = breakpoints['2xl']

    const xs =breakpoints.smallerOrEqual('xs')
    const sm =breakpoints.between('xs', 'sm')
    const md =breakpoints.between('md', 'lg')
    const lg =breakpoints.greaterOrEqual('lg')

    console.log('screensize::sm', sm.value)
    console.log('screensize::lg', lg.value)

    onMounted(async () => {
      if (!store.getters['user/isAuthenticated']) {
        await store.dispatch('user/setUserFromToken')
      }
    })

    return {
      showPanel,
      xs, sm, md, lg
    }
  },
  computed: {
    ...mapGetters('simulation', ['selectedChip'])
  },
}
</script>
