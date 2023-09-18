<template>
  <aside :class="gridClass" class="bg-green-800 border-t border-green-800 text-gray-400 block flex-shrink-0 flex flex-col h-full overflow-hidden z-0">
    <swiper
        ref="hitsSwipe"
        v-if="outcomes.length"
        slidesPerView="auto"
        :spaceBetween="0"
        class="hits-line"
        direction="vertical"
        :auto-height="true"
        style="height: 100%"
    >
      <swiper-slide v-for="outcome in outcomes" :key="outcome.value.round" class="font-medium font-lobster text-lg">
        <div class="flex flex-shrink-0 gap-0">
          <span :class="getHitCss(outcome)" class="h-7 w-6 p-1 text-white text-center inline-block">{{ getHit(outcome) }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import spots from '../lib/table/spots'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useGridProps } from "@/composables/useGridProp"
import { removeEmptyBins, spinTable } from '@/lib/Reducers'
import { spinHistoryTable } from '@/lib/charts/SpinHistoryTable'

import 'swiper/css'

/**
 * Callback function that will find empty bins in crossfilter
 * after filters have been applied. Each crossfilter row is
 * passed into the function (d) where we check if the values
 * are empty or not. If they empty they are removed
 * from the data set.
 */
const spinTableEmptyBinCallback = d => {
  return !(
      +d.value.won === 0 &&
      +d.value.loss === 0)
}

export default {
  components: { Swiper, SwiperSlide },
  props: {
    ...useGridProps()
  },
  data () {
    return {
      outcomes: []
    }
  },
  computed: {
    /**
     * Returns instance of crossfilter
     */
    ...mapGetters('simulation', ['getOutcomes']),
  },
  methods: {
    getHit (outcome) {
      return outcome.value.hit !== 37 ? outcome.value.hit : 0
    },
    getHitCss (outcome) {
      const color = spots[outcome.value.hit].color
      return {
        'bg-accent-375': color === 'red',
        'bg-black': color === 'black',
        'bg-green-400': color === 'green'
      }
    },
    redraw () {
      this.outcomes = [...removeEmptyBins(spinTableEmptyBinCallback, spinTable(this.getOutcomes)).all()].reverse()
    },
    initOutcomes () {
      this.outcomes = [...spinTable(this.getOutcomes).top(Infinity)].reverse()
    },
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.redraw()
      }
    })

    let spinTable = spinHistoryTable();
    spinTable
        .onRedraw(() => {
          this.redraw()
        })
    spinTable.render()

    this.initOutcomes()
  },
}
</script>

<style scoped>
.swiper-wrapper { height: 100%}
.swiper-slides { height: auto !important }
</style>
