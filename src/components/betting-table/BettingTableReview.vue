<template>
  <div class="betting-area mx-4 mb-4 mt-2 p-4 card-bg-border" style="z-index: 0;">
    <wheel></wheel>
    <board
        :selected-chip="selectedChip"
        style="z-index: 0;"
    />
    <game-replay-slider />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Chip from '@/components/Chip.vue'
import Wheel from '@/components/Wheel.vue'
import Board from '@/components/Board.vue'
import BetsDisplayPanel from '@/components/BetsDisplayPanel.vue'
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue'
import SpinButton from "@/components/SpinButton.vue"
import SpinEmitButton from "@/components/SpinEmitButton.vue"
import GameReplaySlider from "@/components/GameReplaySlider.vue"

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board, Chip, SpinButton, SpinEmitButton, GameReplaySlider },
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
