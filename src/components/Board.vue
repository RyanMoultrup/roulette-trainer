<template>
  <div class="h-full w-full">
<!--  <div class="h-full">-->
    <table-limits />
    <div id="table" class="relative p-5 pl-3 grid grid-rows-5 grid-cols-14 font-roulette text-xl opacity-80" ref="boardTable">
      <div
          v-for="bet in bets"
          class="absolute w-28 mt-1 ml-1 backdrop-blur-sm"
          v-bind:class="hoverBetCSS(bet)"
          @mouseleave="leaveHoverBet"
          @click="placeNext(bet.placement)"
      >
        <div v-for="(chip, index) in bet.chips" class="board-chip flex gap-1 items-start">
          <chip
              :id="index"
              class="mb-2 flex-shrink-0"
              size="sm"
              :chipValue="chip.value"
              :color="chip.color" />
          <span class="flex-shrink-0 font-sans text-sm flex-grow text-center py-0.5">{{ formatter.money(chip.value) }}</span>
          <span v-if="getMode !== 'review'" class="text-black self-start text-sm font-red-800" @click.stop="removeChipFromBet({ placement: bet.placement, chipIndex: index, chip })">
            <font-awesome-icon :stlye="{ color: 'red' }" icon="fa-regular fa-circle-xmark" />
          </span>
        </div>
      </div>

      <div v-if="getMode !== 'review'" v-for="placement in placements" :id="placement" :class="placement" class="absolute spot-h z-0" @click="place" @mouseover="hoverBet"></div>

      <div v-for="spot in tableSpots" :class="spot.class">{{ spot.text }}</div>
    </div>
  </div>
</template>

<script>
import formatter from "@/lib/formatter"
import Chip from '@/components/Chip.vue'
import { useToast } from "vue-toastification"
import { tableSpots } from "@/lib/table/table"
import placements from '@/lib/table/BetPlacements'
import TableLimits from "@/components/TableLimits.vue"
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Board',
  components: { TableLimits, Chip },
  props: {
    selectedChip: {
      type: Object,
      default: () => {
        return { color: 'red', value: 5 };
      }
    }
  },
  setup () {
    const toast = useToast();
    return { toast, formatter, tableSpots };
  },
  data () {
    return {
      isHovered: '',
      placements,
      boardWidth: 0,
      maxBoardHeight: 0,
      elementWidth: 0,
      elementHeight: 0,
      hoverWidth: 0,
      hoverHeight: 0,
      resizeObserver: null
    }
  },
  computed: {
    ...mapGetters('simulation', ['getMode']),
    ...mapGetters('strategy', ['getStrategy']),
    ...mapGetters('bank', ['canBet', 'availableBalance']),
    bets () {
      return this.getStrategy
    },
    pPercent () {
      // this.$nextTick(() => {
        const boardWidth = this.elementWidth
        const partWidth = boardWidth / 27
        const partHeight = this.elementHeight / 9


        // console.log('boardHeight::', this.$refs.boardTable.clientHeight)
        console.log('ratio::', this.elementWidth / 4 )
        this.maxBoardHeight = this.elementHeight > (this.elementWidth / 4) ? `${Math.round(this.elementWidth / 4)}%` : `${this.elementHeight}%`

        console.log('maxheight::', this.maxBoardHeight)


        this.hoverWidth = `${partWidth}px`
        this.hoverHeight = `${partHeight}px`

        return Math.round((partWidth / boardWidth * 100) * 10) / 10
      // })
    }
  },
  watch: {
    pPercent (newVal) {
      // this needs to be here
    }
  },
  mounted () {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.elementWidth = entry.contentRect.width
        this.elementHeight = entry.contentRect.height
      }
    })

    this.$nextTick(() => {
      const observedElement = this.$refs.boardTable
      if (observedElement) {
        this.resizeObserver.observe(observedElement);
      }
    })
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.boardTable);
  },
  methods: {
    ...mapMutations('strategy', ['placeBet']),
    ...mapMutations('bank', ['reduceAvailableBalance']),
    ...mapActions('strategy', { placeBetAction: 'placeBet', removeChip: 'removeChip' }),
    hoverBetCSS (bet) {
      return {
        'chips-hover': bet.placement === this.isHovered,
        [bet.placement]: true,
        'chip-spot': bet.placement !== this.isHovered
      }
    },
    async place (event) {
      if (this.getMode === 'review') return
      if (this.canBet(+this.selectedChip.value)) {
        const { success, msg } = await this.placeBetAction({ placement: event.target.id, chip: this.selectedChip });
        if (!success) {
          this.toast.error(msg);
        }
        return;
      }
      this.toast.error("You don't have enough in the bank to place your bet");
    },
    async placeNext (placement) {
      if (this.getMode === 'review') return
      if (this.canBet(+this.selectedChip.value)) {
        const { success, msg } = await this.placeBetAction({ placement, chip: this.selectedChip });
        if (!success) {
          this.toast.error(msg);
        }
        return;
      }
      this.toast.error("You don't have enough in the bank to place your bet");
    },
    hoverBet (event) {
      this.isHovered = event.target.id;
    },
    leaveHoverBet () {
      this.isHovered = '';
    },
    async removeChipFromBet () {
      this.triggerToast(await this.removeChip(...arguments));
    },
    triggerToast ({ success, msg }) {
      if (!success) {
        this.toast.error(msg);
      }
    }
  }
}
</script>

<style scoped>
#table {
  width: 100%;
  height: 90%;
  //max-height: v-bind(maxBoardHeight);
}


@media screen and (max-height: 927px) {
  #table {
    max-height: 20rem;
  }
}

.chips-hover {
  @apply border bg-gray-100 bg-opacity-75 p-1 rounded z-50;
}

.cell {
  @apply p-4 border border-gray-300 text-2xl text-gray-300 text-opacity-90 text-center align-middle
}

.red-cell {
  @apply bg-accent-375
}

.black-cell {
  @apply bg-black
}

.top-border-cell {
  @apply border-t-4
}

.bottom-border-cell {
  @apply border-b-4
}

.right-border-cell {
  @apply border-r-4
}

.left-border-cell {
  @apply border-l-4
}

.outside-cell {
  @apply bg-accent-150
}

.text-large {
  @apply text-4xl
}

.spot-h {
  height: v-bind(hoverHeight);
  width: v-bind(hoverWidth);
}
</style>
