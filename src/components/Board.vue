<template>
  <div class="betting-table">
    <table-limits />
    <div id="table" class="relative p-5 pl-3 grid grid-rows-5 grid-cols-14 font-roulette text-xl opacity-90">
      <div
          v-for="bet in getStrategy" :key="bet.type"
          class="absolute z-0"
          v-bind:class="hoverBetCSS(bet)"
          @mouseleave="leaveHoverBet"
          @click="placeNext(bet.placement)"
      >
        <div v-for="(chip, index) in bet.chips" :key="chip.value" class="board-chip flex gap-1 items-baseline">
          <chip
              class="mb-2 flex-shrink-0"
              size="sm"
              :chipValue="chip.value"
              :color="chip.color" />
          <span class="flex-shrink-0 font-sans text-sm flex-grow text-center py-0.5">${{ chip.value }}</span>
          <span class="flex-shrink-0 relative opacity-100 cursor-pointer w-3 h-3 pb-1 text-center rounded-full bg-red-700 bg-opacity-90 text-white" style="font-size:5px;">
          <span class="p-1 absolute top-1" @click.stop="removeChipFromBet({ placement: bet.placement, chipIndex: index, chip })">x</span>
        </span>
        </div>
      </div>

      <div v-for="placement in placements" :id="placement" :class="placement" class="absolute spot-h" @click="place" @mouseover="hoverBet"></div>

      <div class="spot _0 pt-16 border border-t-3 p-4 bg-green-400 text-white text-3xl text-opacity-70 text-center align-text-middle row-span-3 rounded-tl rounded-bl border-l-4 border-b-4 border-t-4">
        0
      </div>

      <div class="spot _1st-12 _1st-row _3 _3_6 _3_2 _3_6_2_5 border border-l-4 border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        3
      </div>
      <div class="spot _1st-12 _1st-row _6 _3_6 _6_9 _3_6_2_5 _6_5 _6_9_5_8 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
        6
      </div>
      <div class="spot _1st-12 _1st-row _9 _6_9 _9_12 _9_8 _9_12_8_11 _6_9_5_8 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        9
      </div>
      <div class="spot _1st-12 _1st-row _12 _9_12 _12_15 _12_11 _12_15_11_14 _9_12_8_11 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        12
      </div>
      <div class="spot _1st-12 _1st-row _15 _12_15 _15_18 _15_14 _15_18_14_17 _12_15_11_14 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
        15
      </div>
      <div class="spot _1st-12 _1st-row _18 _15_18 _18_21 _18_17 _18_21_17_20 _15_18_14_17 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        18
      </div>
      <div class="spot _1st-12 _1st-row _21 _18_21 _21_24 _21_20 _21_24_20_23 _18_21_17_20 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        21
      </div>
      <div class="spot _1st-12 _1st-row _24 _21_24 _24_27 _24_23 _24_27_23_26 _21_24_20_23 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
        24
      </div>
      <div class="spot _1st-12 _1st-row _27 _24_27 _27_30 _27_26 _27_30_26_29 _24_27_23_26 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        27
      </div>
      <div class="spot _1st-12 _1st-row _30 _27_30 _30_33 _30_29 _30_33_29_32 _27_30_26_29 border border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        30
      </div>
      <div class="spot _1st-12 _1st-row _33 _30_33 _33_36 _33_32 _33_36_32_35 _30_33_29_32 border border-t-3 p-4 bg-black text-white text-2xl text-center align-middle border-t-4">
        33
      </div>
      <div class="spot _1st-12 _1st-row _36 _33_36 _36_35 _33_36_32_35 border border-r-4 border-t-3 p-4 bg-red-700 text-white text-2xl text-center align-middle border-t-4">
        36
      </div>
      <div class="spot border border-t-3 p-4 bg-green-400 text-white text-opacity-70 text-base text-center align-middle rounded-tr rounded-br border-t-4 border-r-4">
        2/1
      </div>

      <div class="spot _2 _3_2 _3_6_2_5 border border-l-4 p-4 bg-black text-white text-2xl text-center align-middle">
        2
      </div>
      <div class="spot _5 _6_5 _3_6_2_5 _6_9_5_8 border p-4 bg-red-700 text-white text-2xl text-center align-middle">
        5
      </div>
      <div class="spot _8 _9_8 _6_9_5_8 _9_12_8_11 border p-4 bg-black text-white text-2xl text-center align-middle">
        8
      </div>
      <div class="spot border _11 _12_11 _12_15_11_14 _9_12_8_11  p-4 bg-black text-white text-2xl text-center align-middle">
        11
      </div>
      <div class="spot border _14 _12_15_11_14 _15_14 _15_18_14_17 p-4 bg-red-700 text-white text-2xl text-center align-middle">
        14
      </div>
      <div class="spot border _17 _15_18_14_17 _18_17 _18_21_17_20 p-4 bg-black text-white text-2xl text-center align-middle">
        17
      </div>
      <div class="spot border _20 _18_21_17_20 _21_20 _21_24_20_23 p-4 bg-black text-white text-2xl text-center align-middle">
        20
      </div>
      <div class="spot border _23 _21_24_20_23 _24_23 _24_27_23_26 p-4 bg-red-700 text-white text-2xl text-center align-middle">
        23
      </div>
      <div class="spot border _26 _24_27_23_26 _27_26 _27_30_26_29 p-4 bg-black text-white text-2xl text-center align-middle">
        26
      </div>
      <div class="spot border _29 _27_30_26_29 _30_29 _30_33_29_32 p-4 bg-black text-white text-2xl text-center align-middle">
        29
      </div>
      <div class="spot border _32 _30_33_29_32 _33_32 _33_36_32_35 p-4 bg-red-700 text-white text-2xl text-center align-middle">
        32
      </div>
      <div class="spot border _35 _33_36_32_35 _36_35 border-r-4 p-4 bg-black text-white text-2xl text-center align-middle">
        35
      </div>
      <div class="spot border p-4 bg-green-400 text-white text-opacity-70 text-base text-center align-middle border-r-4 rounded-br rounded-tr">
        2/1
      </div>

      <div class="spot border _1 border-l-4 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        1
      </div>
      <div class="spot border _4 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        4
      </div>
      <div class="spot border _7 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        7
      </div>
      <div class="spot border _10 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        10
      </div>
      <div class="spot border _13 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        13
      </div>
      <div class="spot border _16 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        16
      </div>
      <div class="spot border _19 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        19
      </div>
      <div class="spot border _22 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        22
      </div>
      <div class="spot border _25 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        25
      </div>
      <div class="spot border _28 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        28
      </div>
      <div class="spot border _31 p-4 bg-black text-white text-2xl text-center align-middle border-b-4">
        31
      </div>
      <div class="spot border _34 border-r-4 p-4 bg-red-700 text-white text-2xl text-center align-middle border-b-4">
        34
      </div>
      <div class="spot border p-4 bg-green-400 text-white text-opacity-70 text-base text-center align-middle rounded-br rounded-tr border-b-4 border-r-4">
        2/1
      </div>

      <div class="spot __1st-12 border p-4 bg-green-400 text-white text-opacity-70 text-4xl text-center align-middle col-span-4 col-start-2 border-l-4 rounded-tl">
        1ST 12
      </div>
      <div class="spot border p-4 bg-green-400 text-white text-opacity-70 text-4xl text-center align-middle col-span-4">
        2ND 12
      </div>
      <div class="spot border p-4 bg-green-400 text-white text-opacity-70 text-4xl text-center align-middle col-span-4 border-r-4 rounded-tr">
        3RD 12
      </div>

      <div class="spot border p-2 pt-4 bg-green-400 text-white text-opacity-70 text-xl text-center align-middle col-span-2 col-start-2 rounded-bl border-b-4 border-l-4">
        1 TO 18
      </div>
      <div class="spot border p-4 bg-green-400 text-white text-2xl text-opacity-70 text-center align-middle col-span-2 border-b-4">
        EVEN
      </div>

      <div class="spot border p-4 bg-red-700 text-white text-2xl text-center align-middle col-span-2 border-b-4">
        RED
      </div>
      <div class="spot border p-2 pt-4 bg-black text-white text-2xl text-center align-middle col-span-2 border-b-4">
        BLACK
      </div>

      <div class="spot border p-4 bg-green-400 text-white text-2xl text-opacity-70 text-center align-middle col-span-2 border-b-4">
        ODD
      </div>
      <div class="spot border p-2 pt-4 bg-green-400 text-white text-opacity-70 text-xl text-center align-middle col-span-2 rounded-br border-r-4 border-b-4">
        19 TO 36
      </div>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip.vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import placements from '@/lib/table/BetPlacements';
import { useToast } from "vue-toastification";
import TableLimits from "@/components/TableLimits.vue";

export default {
  name: 'Board',
  components: {TableLimits, Chip },
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
    return { toast };
  },
  data () {
    return {
      isHovered: '',
      placements
    }
  },
  computed: {
    ...mapGetters('strategy', ['getStrategy']),
    ...mapGetters('bank', ['canBet', 'availableBalance']),
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

<style>
.chips-hover {
  @apply border bg-gray-100 bg-opacity-90 p-1 rounded z-40;
}
</style>
