<template>
  <div class="betting-area mx-4 mb-4 mt-2 p-4 card-bg-border">
    <div class="spin-buttons px-2 py-3 sm:px-6 justify-between">
      <div class="flex gap-1">
        <spin-button />
        <spin-emit-button />
      </div>
    </div>

    <wheel></wheel>
    <board
      :selected-chip="selectedChip"
    />
    <chip-selection-panel @chipSelected="chipSelected" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Chip from '@/components/Chip.vue';
import Wheel from '@/components/Wheel.vue';
import Board from '@/components/Board.vue';
import BetsDisplayPanel from '@/components/BetsDisplayPanel.vue';
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue';
import SpinButton from "@/components/SpinButton.vue";
import SpinEmitButton from "@/components/SpinEmitButton.vue";

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board, Chip, SpinButton, SpinEmitButton },
  data () {
    return {
      bets: [],
      rounds: 0,
      emittingSpins: false
    }
  },
  watch: {
    '$store.state.simulation.rounds': function (val) {
      this.rounds = val;
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
