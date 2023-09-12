<template>
  <div class="flex flex-col items-center gap-3 justify-self-end">
    <div class="font-roulette relative w-28 h-28 rounded-full" :style="{'background-color': colorHex}">
      <div class="spin-result flex flex-col items-center">
        <div class="result-number">{{ spin }}</div>
        <div class="result-color">{{ color }}</div>
      </div>
    </div>
    <rounds-display class="flex justify-center gap-2" />
  </div>
</template>

<script>
import spots from '../lib/table/spots'
import chartResize from "@/lib/charts/ChartResize"
import RoundsDisplay from "@/components/RoundsDisplay.vue"

export default {
  components: { RoundsDisplay },
  data () {
    return {
      spin: null,
      color: '',
      colorHex: '#0C4F4C',
      chartResizer: chartResize,
    }
  },
  watch: {
    '$store.state.simulation.spin': function (val) {
      if (spots[val].color === 'green') {
        this.colorHex = spots[val].color
      } else {
        this.colorHex = spots[val].color === 'red' ? '#B91C1C' : 'black'
      }
      this.color = spots[val].color
      this.spin = val === 37 ? 0 : val
    }
  }
}
</script>

<style>
  .spin-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .result-number {
    font-size: 2.5rem;
    font-weight: 500;
    //line-height: 1.2;
    //margin-top: 18px;
  }

  .result-color {
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1;
  }


.color-green {
  background-color: green;
}

.color-black {
  background-color: black;
}

.color-red {
  background-color: #B91C1C;
}

.visuallyhidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
