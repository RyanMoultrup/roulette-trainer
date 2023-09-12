<template>
  <div class="relative w-[50%] lg:w-full">
    <div class="absolute chips-container bg-accent-150 border border-green-800 border-1 p-3 rounded-md">
      <swiper
          v-if="chips.length"
          slidesPerView="auto"
          :spaceBetween="10"
          :auto-width="true"
          class="mySwiper"
      >
        <swiper-slide v-for="chip in chips">
            <chip class="text-2xl" :color="chip.color" size="md" :chipValue="chip.value" @chipSelected="chipSelected"></chip>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import chips from '@/lib/table/chips'
import Chip from '@/components/Chip.vue'
import { mapGetters, mapMutations } from "vuex"
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'

export default {
  components: { Chip, Swiper, SwiperSlide },
  data () {
    return {
      allChips: chips
    }
  },
  computed: {
    ...mapGetters('bank', ['balance']),
    chips () {
      return this.allChips.filter(c => c.value <= this.balance || c.value <= 100)
    }
  },
  methods: {
    ...mapMutations('simulation', ['updateSelectedChip']),
    chipSelected (chip) {
      this.updateSelectedChip(chip);
    }
  }
}
</script>
<style>
.chips-container {
  min-width: 0;
  width: 95%;
}
@media screen and (max-height: 927px) {
  .chips-container {
    width: 100%
  }
}
</style>
<style scoped>

/*.swiper-slides { width: auto !important }*/
.swiper-slide { width: auto !important; }
</style>

