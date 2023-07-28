<template>
  <div id="chips-container" class="chips-panel flex flex-row justify-start w-full px-4 -z-10" style="min-width: 0;"> <!-- -bottom-8 -->
    <div class="flex flex-col shrink-0 justify-end gap-3 p-2 mr-2">
      <double-bet-button />
      <replay-last-bet-button />
    </div>
    <div style="min-width: 0;" class="max-w-[75%]">
      <div class="bg-green-500 border border-green-800 border-1 p-3 rounded-md">
        <swiper
            :slidesPerView="5"
            :spaceBetween="2"
            class="mySwiper"
        >
          <swiper-slide v-for="chip in chips">
            <chip class="text-2xl" :color="chip.color" size="lg" :chipValue="chip.value" @chipSelected="chipSelected"></chip>
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
import DoubleBetButton from "@/components/DoubleBetButton.vue";
import ReplayLastBetButton from "@/components/ReplayLastBetButton.vue";

// Import Swiper styles
import 'swiper/css';

export default {
  components: { SelectedChip, Chip, DoubleBetButton, ReplayLastBetButton, Swiper, SwiperSlide },
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

