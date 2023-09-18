<template>
    <div :class="gridClass" class="mx-4 mb-4 mt-2 p-4 card-bg-border" style="z-index: 0;">
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-row items-center gap-4 h-full">
          <wheel></wheel>
            <div class="flex flex-col w-full h-full">
            <table-limits />
              <board
                  :selected-chip="selectedChip"
                  style="z-index: 0;"
              />
          </div>
        </div>

        <div class="flex z-0">
          <div class="px-2 py-3 sm:px-6 justify-between">
            <div class="flex gap-1">
              <spin-button />
              <spin-emit-button />
            </div>
          </div>
          <game-play-controls />
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Wheel from '@/components/Wheel.vue'
import Board from '@/components/Board.vue'
import {useGridProps} from "@/composables/useGridProp"
import TableLimits from "@/components/TableLimits.vue"
import BaseCard from "@/components/ui/Base/BaseCard.vue"
import SpinButton from "@/components/buttons/SpinButton.vue"
import GamePlayControls from "@/components/GamePlayControls.vue"
import SpinEmitButton from "@/components/buttons/SpinEmitButton.vue"

export default {
  name: 'BettingTable',
  components: { GamePlayControls, TableLimits, BaseCard, Wheel, Board, SpinButton, SpinEmitButton },
  props: {
    ...useGridProps()
  },
  data () {
    return {
      bets: [],
      rounds: 0,
      emittingSpins: false
    }
  },
  computed: {
    ...mapGetters('simulation', ['selectedChip'])
  },
  methods: {
    ...mapGetters('strategy', ['getStrategy'])
  }
}
</script>
