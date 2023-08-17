<template>
  <div :class="gridClass" class="mx-4 mb-4 mt-2 p-4 card-bg-border" style="z-index: 0;">
    <wheel></wheel>
    <board />
    <game-replay-slider />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Wheel from '@/components/Wheel.vue'
import Board from '@/components/Board.vue'
import GameReplaySlider from "@/components/GameReplaySlider.vue"
import { useGridProps } from "@/composables/useGridProp";

export default {
  name: 'BettingTableReview',
  components: { Wheel, Board, GameReplaySlider },
  props: {
    ...useGridProps() // gridClass
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
