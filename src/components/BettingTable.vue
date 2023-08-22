<template>
    <div :class="gridClass" class="betting-area mx-4 mb-4 mt-2 p-4 card-bg-border" style="z-index: 0;">
      <div class="spin-buttons px-2 py-3 sm:px-6 justify-between">
        <div class="flex gap-1">
          <spin-button />
          <spin-emit-button />
        </div>
      </div>

      <wheel></wheel>
      <board
          :selected-chip="selectedChip"
          style="z-index: 0;"
      />
      <chip-selection-panel @chipSelected="chipSelected" />
    </div>
</template>

<script>
import Wheel from '@/components/Wheel.vue'
import Board from '@/components/Board.vue'
import { mapGetters, mapMutations } from 'vuex'
import SpinButton from "@/components/SpinButton.vue"
import {useGridProps} from "@/composables/useGridProp"
import BaseCard from "@/components/ui/Base/BaseCard.vue"
import SpinEmitButton from "@/components/SpinEmitButton.vue"
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue'

export default {
  name: 'BettingTable',
  components: {BaseCard, Wheel, ChipSelectionPanel, Board, SpinButton, SpinEmitButton },
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
    ...mapGetters('strategy', ['getStrategy']),
    ...mapMutations('simulation', ['updateSelectedChip']),
    chipSelected (chip) {
      this.updateSelectedChip(chip);
    }
  }
}
</script>
