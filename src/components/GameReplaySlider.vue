<template>
  <div class="chips-panel flex flex-col items-center">
    <div id="vis"></div>
    <div class="text-3xl text-gray-300 flex flex-row gap-12 bg-accent-100 rounded-full py-2 px-10 drop-shadow-lg border border-green-700">
      <span class="slider-backing relative cursor-pointer"><font-awesome-icon @click="sliderBack" icon="fa-solid fa-backward-step" /></span>
      <span v-show="!isPlaying" class="relative cursor-pointer"><font-awesome-icon @click="play" icon="fa-solid fa-play" /></span>
      <span v-show="isPlaying" class="relative cursor-pointer"><font-awesome-icon @click="pause" icon="fa-solid fa-pause" /></span>
      <span class="slider-backing relative cursor-pointer"><font-awesome-icon @click="sliderForward" icon="fa-solid fa-forward-step" /></span>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
import { redrawAll } from "dc"
import { useStore } from "vuex"
import timer from "@/lib/timer";
import { onMounted, onUnmounted, ref, watch } from "vue"
import { getNewChipsFromValue } from "@/lib/table/ChipAggregator";

export default {
  setup() {
    const store = useStore()
    let isPlaying = ref(false)
    let currentValue = ref(0)
    let maxRound = 0
    let handle
    let x
    let dimension
    let group
    let facts
    let unsubscribeFromStore

    const unwatch = watch(currentValue, async (newVal, oldVal) => {
      store.dispatch('simulation/setRound', newVal)
      await store.dispatch('strategy/clearAll')

      const filteredOutcomes = facts.all()
          .filter(d => d.round === currentValue.value)

      store.commit('simulation/addFilteredOutcomes', filteredOutcomes)

      const { bet, hit } = filteredOutcomes
          .reduce((reducer, round) => {
            const chips = getNewChipsFromValue(round.bet)
            chips.forEach(c => store.dispatch('strategy/placeBet', { placement: round.placement, chip: c }))
            reducer.bet += round.bet
            reducer.hit = round.hit
            return reducer
          }, { bet: 0, hit: null })

      store.commit('simulation/updateSpin', hit)
    })

    onUnmounted(() => {
      if (unsubscribeFromStore) {
        unsubscribeFromStore()
        d3.select("#vis").selectAll("*").remove()
        timer.stop()
        unwatch()
        dimension.dispose()
        facts.remove()
      }
    })

    const sliderForward = () => {
      moveSlider(1)
    }

    const sliderBack = () => {
      moveSlider(-1)
    }

    const play = () => {
      isPlaying.value = true
      timer.start(1, () => {
        moveSlider(1)
      })
    }

    const pause = () => {
      isPlaying.value = false
      timer.stop()
    }

    function moveSlider(step) {
      let newRound = currentValue.value + step;

      // Ensure the new round is within allowable range
      if (newRound >= 1 && newRound <= maxRound) {
        currentValue.value = newRound;
        update(currentValue.value);
      }
    }


    function update(h) {
      handle.attr("cx", x(h));
      applyCrossfilter(h)
    }

    function applyCrossfilter(round) {
      dimension.filterRange([1, round+1])
      redrawAll()
    }

    const handleMutation = (mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        facts = state.simulation.outcomes
        dimension = facts.dimension(d => d.round)
        group = dimension.group()

        const margin = {top: 0, right: 50, bottom: 0, left: 50}
        const width = 960 - margin.left - margin.right
        const height = 75 - margin.top - margin.bottom

        const histHeight = height / 5;

        maxRound = d3.max(facts.all(), d => d.round)

        x = d3.scaleLinear()
            .domain([1, maxRound])
            .range([0, width])
            .clamp(true);

        const y = d3.scaleLinear()
            .range([histHeight, 0]);

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const plot = svg.append("g")
            .attr("class", "plot")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + margin.left + "," + (margin.top + histHeight + 5) + ")");

        slider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function () {
              return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(d3.drag()
                .on("start.interrupt", function () {
                  slider.interrupt();
                })
                .on("start drag", (event) => {
                  currentValue.value = Math.round(x.invert(event.x));
                  update(currentValue.value)
                })
            );

        slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(maxRound))
            .join("text")
            .attr("x", x)
            .attr("y", 10)
            .attr("color", "white")
            .attr("text-anchor", "middle")
            .text(d => d);

        handle = slider.insert("circle", ".track-overlay")
            .attr("class", "handle")
            .attr("r", 9);
      }
    };

    onMounted(() => {
      unsubscribeFromStore = store.subscribe(handleMutation)
    })

    return {
      sliderForward,
      sliderBack,
      play,
      pause,
      isPlaying
    }
  }
}
</script>
<style>

.slider-backing::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #073331;
  z-index: -1;
  width: 2.9rem;
  height: 2.9rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.ticks {
  font-size: 10px;
  fill: white;
}

.track,
.track-inset,
.track-overlay {
  stroke-linecap: round;
}

.track {
  stroke: #073331;
  stroke-width: 10px;
}

.track-inset {
  stroke: #073331;
  stroke-width: 8px;
}

.track-overlay {
  pointer-events: stroke;
  stroke-width: 50px;
  stroke: transparent;
  cursor: crosshair;
}

.handle {
  fill: darkgreen;
  stroke: #000;
  stroke-opacity: 0.5;
  stroke-width: 1.25px;
}
</style>