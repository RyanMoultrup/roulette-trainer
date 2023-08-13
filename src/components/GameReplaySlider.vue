<template>
  <div class="chips-panel flex flex-col items-center">
    <div id="vis"></div>
    <div class="text-3xl text-gray-300 flex flex-row gap-12 bg-green-500 rounded-full py-2 px-10 drop-shadow-lg border border-green-700">
      <span class="slider-backing relative cursor-pointer"><font-awesome-icon @click="sliderBack" icon="fa-solid fa-backward-step" /></span>
      <span v-show="!isPlaying" class="relative cursor-pointer"><font-awesome-icon @click="play" icon="fa-solid fa-play" /></span>
      <span v-show="isPlaying" class="relative cursor-pointer"><font-awesome-icon @click="pause" icon="fa-solid fa-pause" /></span>
      <span class="slider-backing relative cursor-pointer"><font-awesome-icon @click="sliderForward" icon="fa-solid fa-forward-step" /></span>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
import { onMounted, ref, watch } from "vue"
import { useStore } from "vuex"
import { redrawAll } from "dc"
import { getNewChipsFromValue } from "@/lib/table/ChipAggregator";
import timer from "@/lib/timer";

console.log('d3::', d3)

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

    watch(currentValue, async (newVal, oldVal) => {
      store.dispatch('simulation/setRound', newVal)
      await store.dispatch('strategy/clearAll')

      const { bet, hit } = facts.all()
          .filter(d => d.round === currentValue.value)
          .reduce((reducer, round) => {
            const chips = getNewChipsFromValue(round.bet)
            chips.forEach(c => store.dispatch('strategy/placeBet', { placement: round.placement, chip: c }))
            reducer.bet += round.bet
            reducer.hit = round.hit
            return reducer
          }, { bet: 0, hit: null })

      store.commit('simulation/updateSpin', hit)
    })
    // const facts = store.getters['simulation/getOutcomes']

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
      // const newData = dataset.filter(d => d.date < h);
      // drawPlot(newData);
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

        const parseDate = d3.timeParse("%d-%b-%y");

        const startDate = new Date("2004-11-01"),
            endDate = new Date("2017-04-01");

        const dateArray = d3.timeYears(startDate, d3.timeYear.offset(endDate, 1));

        const colours = d3.scaleOrdinal()
            .domain(dateArray)
            .range(['#ffc388', '#ffb269', '#ffa15e', '#fd8f5b', '#f97d5a', '#f26c58', '#e95b56', '#e04b51', '#d53a4b', '#c92c42', '#bb1d36', '#ac0f29', '#9c0418', '#8b0000']);

        maxRound = d3.max(facts.all(), d => d.round)

        x = d3.scaleLinear()
            .domain([1, maxRound])
            .range([1, width])
            .clamp(true);

        const y = d3.scaleLinear()
            .range([histHeight, 0]);

        // const histogram = d3.histogram()
        //     .domain(x.domain())
        //     .thresholds(x.ticks(d3.timeYear))
        //     .value(function (d) {
        //       return d.date;
        //     });

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

// const hist = svg.append("g")
//     .attr("class", "histogram")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let dataset;

        const plot = svg.append("g")
            .attr("class", "plot")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("histogram.csv", prepare)
//     .then(data => {
//       const bins = histogram(data);
//       y.domain([0, d3.max(bins, d => d.length)]);
//
//       const bar = hist.selectAll(".bar")
//           .data(bins)
//           .join("g")
//           .attr("class", "bar")
//           .attr("transform", d => "translate(" + x(d.x0) + "," + y(d.length) + ")");
//
//       bar.append("rect")
//           .attr("class", "bar")
//           .attr("x", 1)
//           .attr("width", d => x(d.x1) - x(d.x0) - 1)
//           .attr("height", d => histHeight - y(d.length))
//           .attr("fill", d => colours(d.x0));
//
//       bar.append("text")
//           .attr("dy", ".75em")
//           .attr("y", "6")
//           .attr("x", d => (x(d.x1) - x(d.x0))/2)
//           .attr("text-anchor", "middle")
//           .text(d => d.length > 15 ? d.length : "")
//           .style("fill", "white");
//
//       dataset = data;
//       drawPlot(dataset);
//     })
//     .catch(error => {
//       console.error("Error loading the CSV data:", error);
//     });

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
            .data(x.ticks(30))
            .join("text")
            .attr("x", x)
            .attr("y", 10)
            .attr("color", "white")
            .attr("text-anchor", "middle")
            .text(d => d);

        handle = slider.insert("circle", ".track-overlay")
            .attr("class", "handle")
            .attr("r", 9);

        function drawPlot(data) {
          const locations = plot.selectAll(".location")
              .data(data, d => d.id)
              .join(
                  enter => enter.append("circle")
                      .attr("class", "location")
                      .attr("cx", d => x(d.date))
                      .attr("cy", d => Math.random() * 500)
                      .attr("r", 5)
                      .style("fill", d => colours(d.date)),
                  update => update,
                  exit => exit.remove()
              );
        }



        function prepare(d) {
          d.date = parseDate(d.date);
          return d;
        }
      }
    };

    onMounted(() => {
      store.subscribe(handleMutation)
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
  background-color: #114726;
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
  stroke: #0A2916;
  stroke-width: 10px;
}

.track-inset {
  stroke: #071c0f;
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