<template>
  <div id="chips-container" class="chips-panel flex flex-row justify-start w-full px-4" style="min-width: 0;"> <!-- -bottom-8 -->
    <div class="flex flex-col shrink-0 justify-end gap-3 p-2 mr-2">
      <double-bet-button />
      <replay-last-bet-button />
    </div>
    <div style="min-width: 0;">
      <selected-chip class="font-lobster mb-4 text-gray-300 text-xl"/>
<!--      <div class="chips flex gap-3">-->
<!--        <chip v-for="chip in chips()" :color="chip.color" size="lg" :chipValue="chip.value" @chipSelected="chipSelected"></chip>-->
<!--      </div>-->
      <swiper
          v-if="ready"
          :slidesPerView="6"
          :spaceBetween="2"
          class="mySwiper"
      >
        <swiper-slide v-for="chip in chips">
          <chip :color="chip.color" size="lg" :chipValue="chip.value" @chipSelected="chipSelected"></chip>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import chips from '@/lib/table/chips';
import Chip from '@/components/Chip.vue';
import SelectedChip from "@/components/SelectedChip.vue";
import DoubleBetButton from "@/components/DoubleBetButton.vue";
import ReplayLastBetButton from "@/components/ReplayLastBetButton.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
  setup() {
    return {
      chips
    };
  },
  components: { SelectedChip, Chip, DoubleBetButton, ReplayLastBetButton, Swiper, SwiperSlide },
  data () {
    return {
      ready: false
    }
  },
  mounted () {
      this.$nextTick(() => {
        this.ready = true;
      })
  },
  methods: {
    chipSelected (chip) {
      this.$emit('chipSelected', chip);
    }
  }
}
</script>

<style scoped>
.swiper-container{
  height: 100%;
  max-height: 100vw;
  min-height: 0;
  min-width: 0;
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
}

.swiper-slide{
  width: auto;
  flex-shrink: 0;
  display: block;
  height: 100%;
  max-height: 100%;
}

.swiper-wrapper{
  max-height: 100%;
  height: 100%t;
  display: flex;
}
</style>