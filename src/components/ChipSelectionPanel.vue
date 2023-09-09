<template>
  <div class="relative flex flex-row justify-start px-4 -z-10 w-full" style="min-width: 0;"> <!-- -bottom-8 -->
    <div class="flex flex-col shrink-0 justify-end gap-3 p-2 mr-2">
      <double-bet-button />
      <replay-last-bet-button />
      <clear-bets-button />
    </div>
    <div class="relative w-full">
      <div class="absolute chips-container bg-accent-150 border border-green-800 border-1 p-3 rounded-md">
        <swiper
            v-if="chips.length"
            slidesPerView="auto"
            :spaceBetween="10"
            :auto-width="true"
            class="mySwiper"
        >
          <swiper-slide v-for="chip in chips">
<!--            <div class="flex shrink gap-0">-->
              <chip class="text-2xl" :color="chip.color" size="lg" :chipValue="chip.value" @chipSelected="chipSelected"></chip>
<!--            </div>-->
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <selected-chip class="font-lobster mb-4 text-gray-300 text-2xl self-start flex flex-col self-end ml-4"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import chips from '@/lib/table/chips';
import Chip from '@/components/Chip.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SelectedChip from "@/components/SelectedChip.vue";
import DoubleBetButton from "@/components/buttons/DoubleBetButton.vue";
import ClearBetsButton from "@/components/buttons/ClearBetsButton.vue";
import ReplayLastBetButton from "@/components/buttons/ReplayLastBetButton.vue";
// Import Swiper styles
import 'swiper/css'

export default {
  components: { ClearBetsButton, SelectedChip, Chip, DoubleBetButton, ReplayLastBetButton, Swiper, SwiperSlide },
  data () {
    return {
      allChips: chips
    }
  },
  computed: {
    ...mapGetters('bank', ['balance']),
    chips () {
      return this.allChips.filter(c => c.value <= this.balance || c.value <= 100);
    }
  },
  methods: {
    chipSelected (chip) {
      this.$emit('chipSelected', chip);
    }
  }
}
</script>
<style>
.chips-container {
  min-width: 0;
  width: 95%;
}
</style>
<style scoped>

/*.swiper-slides { width: auto !important }*/
.swiper-slide { width: auto !important; }
</style>

