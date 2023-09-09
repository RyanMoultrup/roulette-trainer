<template>
  <div id="wheel">
    <div class="main" ref="wheelRef">
      <div class="plate" id="plate" :style="{ '--dynamic-platesize': wheelSize + 'px' }">
        <ul class="inner">
          <li v-for="num in wheelNums" class="wheel-number"><label><input type="radio" name="pit" :value="num"/>
            <span class="pit">{{ num }}</span></label>
          </li>
        </ul>
        <div class="wheel-data reveal">
          <div class="data-inner">
            <div class="mask"></div>
            <div class="wheel-result font-roulette" :style="{'background-color': colorHex}">
              <div class="spin-result">
                <div class="result-number">{{ spin }}</div>
                <div class="result-color">{{ color }}</div>
              </div>
            </div>
          </div>
        </div>
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
      wheelNums: [32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0],
      wheelSize: 0,
      spin: null,
      color: '',
      colorHex: 'gray',
      chartResizer: chartResize,
      resizeWheel: {
        rescale: (width) => {
          console.log('rescale width::', width)
          this.wheelSize = width > 500 ? 500 : width
        }
      }
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
  },
  mounted () {
    this.wheelSize = window.innerWidth * 0.15
    this.$nextTick(() => {
      addEventListener('resize', this.chartResizer(this.resizeWheel, this.$refs.wheelRef))
    })
  },
  unmounted() {
    window.removeEventListener('resize', this.chartResizer)
  }
}
</script>

<style lang="less">
@rotate: (360/@to)+0deg;
@rimsize: 6px;
@trim: #B16938;
@trimSecondary: silver;
@spinButton: green;
@resetButton: darkgreen;
@spins: 8;
@from: 1;
@to: 37;

.loop(@index) when (@index < @to) {
  .wheel-number:nth-child(@{index}) {
    transform: rotateZ(@rotate*@index);
  }
  .loop(@index + 1);
}
.loop(@from);

.main {
  width: calc(var(--dynamic-platesize) + 24px);
  margin: 0 auto;
}

.plate {
  background-color: gray;
  width: var(--dynamic-platesize);
  height: var(--dynamic-platesize);
  margin: calc(var(--dynamic-platesize) * 0.04);

  border-radius: 50%;
  position: relative;
  animation: rotate 48s infinite linear;

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
  }

  &:after {
    top: calc(var(--dynamic-platesize) * -0.015);
    right: calc(var(--dynamic-platesize) * -0.015);
    bottom: calc(var(--dynamic-platesize) * -0.015);
    left: calc(var(--dynamic-platesize) * -0.015);
    border: calc(var(--dynamic-platesize) * 0.015) solid @trim;
    // Separate the calc() and darken/lighten functions
    @rimsizeCalc: calc(var(--dynamic-platesize) * 0.02 / 3);
    box-shadow: inset 0px 0px 0px @rimsizeCalc darken(@trim, 15%),
    0px 0px 0px @rimsizeCalc lighten(@trim, 25%);
  }


  &:before {
    background: rgba(0, 0, 0, .65);
    border: 1px solid @trimSecondary;
    box-shadow: inset 0px 0px 0px 2px darken(@trimSecondary, 25%);
    top: 12%;
    left: 12%;
    right: 12%;
    bottom: 12%;
    z-index: 1;
  }
}

.wheel-number {
  width: calc(var(--dynamic-platesize) / 10); // Replacing @pitwidth
  height: calc(var(--dynamic-platesize) / 2);
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  left: calc(50% - (var(--dynamic-platesize) / 20)); // Replacing @pitwidth / 2
  transform-origin: 50% 100%;
  background-color: transparent;
  border-left: calc(var(--dynamic-platesize) / 20) solid transparent; // Replacing @pitwidth / 2
  border-right: calc(var(--dynamic-platesize) / 20) solid transparent; // Replacing @pitwidth / 2
  border-top: calc(var(--dynamic-platesize) / 2) solid black;
  box-sizing: border-box;

  &:nth-child(odd) {
    border-top-color: #520703;
  }

  &:nth-child(@{to}) {
    border-top-color: green;
  }
}

.pit {
  color: #fff;
  padding-top: 12px;
  width: calc(var(--dynamic-platesize) / 10); // Replacing @pitwidth
  display: inline-block;
  font-size: 12px;
  transform: scale(1, 1.8);
  position: absolute;
  top: calc(var(--dynamic-platesize) / -2);
  left: calc(var(--dynamic-platesize) / -20); // Replacing -@pitwidth / 2
}

.inner {
  display: block;
  height: var(--dynamic-platesize);
  width: var(--dynamic-platesize);
  position: relative;

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
  }

  &:after {
    z-index: 3;
    top: 24%;
    right: 24%;
    bottom: 24%;
    left: 24%;
    background-color: darken(@trimSecondary, 45%);
    border: 3px solid darken(@trimSecondary, 25%);
  }
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.wheel-data {
  display: block;
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50%;
  animation: rotate 48s reverse linear infinite;
  perspective: 2000px;
  z-index: 100;


  .data-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.72s;
    transform-style: preserve-3d;

  }

  &.reveal .data-inner {
    transform: rotateY(180deg);
  }

  .mask,
  .wheel-result {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
  }

  .mask {
    color: #fff;
    font-size: 24px;
    margin: auto;
    line-height: 1.4;
    padding-top: 36px;
  }

  .wheel-result {
    background-color: green;
    color: white;
    transform: rotateY(180deg);
    align-items: center;
  }

  .spin-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .result-number {

    font-size: 4rem;
    font-weight: 500;
    //line-height: 1.2;
    //margin-top: 18px;

  }

  .result-color {
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1;
    //margin-top: 25px;
    //transform: translateY(50%)
  }
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
