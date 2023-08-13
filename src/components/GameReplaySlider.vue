<template>
  <h2>Hello Slider!</h2>
  <div id="vis"></div>
</template>
<script>
import * as d3 from 'd3'
import { onMounted, computed, watch, ref } from "vue"
import { useStore } from "vuex"
import reductio from "reductio"
import { redrawAll } from "dc"

console.log('d3::', d3)

export default {
  setup() {
    const store = useStore()
    // const facts = store.getters['simulation/getOutcomes']

    const handleMutation = (mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        console.log('Outcome was added:', mutation.payload);
        // React to the mutation here.
        console.log('in setup:::', state)
        const facts = state.simulation.outcomes
        const dimension = facts.dimension(d => d.round)
        const group = dimension.group()

        // const reducer = reductio()
        // reducer
        //     .exception(d => d.round)
        //     .exceptionCount(true)
        //
        // reducer(group)

        console.log('group', group.all())

        const margin = {top: 50, right: 50, bottom: 0, left: 50},
            width = 960 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        const histHeight = height / 5;

        const parseDate = d3.timeParse("%d-%b-%y");
        const formatDateIntoYear = d3.timeFormat("%Y");

        const startDate = new Date("2004-11-01"),
            endDate = new Date("2017-04-01");

        const dateArray = d3.timeYears(startDate, d3.timeYear.offset(endDate, 1));

        const colours = d3.scaleOrdinal()
            .domain(dateArray)
            .range(['#ffc388', '#ffb269', '#ffa15e', '#fd8f5b', '#f97d5a', '#f26c58', '#e95b56', '#e04b51', '#d53a4b', '#c92c42', '#bb1d36', '#ac0f29', '#9c0418', '#8b0000']);

        const maxRound = d3.max(facts.all(), d => d.round)
        console.log('facts.all()::', facts.all())

        console.log('maxRound::', maxRound)

        const x = d3.scaleLinear()
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

        let currentValue = 0;
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
                  currentValue = Math.round(x.invert(event.x));
                  update(currentValue)
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
            .attr("text-anchor", "middle")
            .text(d => d);

        const handle = slider.insert("circle", ".track-overlay")
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

        function update(h) {
          console.log('updating::', h)
          handle.attr("cx", x(h));
          applyCrossfilter(h)
          // const newData = dataset.filter(d => d.date < h);
          // drawPlot(newData);
        }

        function applyCrossfilter(round) {
          console.log('applying crossfilter::', round)
          dimension.filterRange([1, round+1])
          console.log('group::', group.all())
          redrawAll()
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

    // console.log('the facts:::', facts)



//     onMounted(() => {

    // })
  }
}
</script>
<style>
body {
  font-family: "avenir next", Arial, sans-serif;
  font-size: 12px;
  color: #696969;
}

.ticks {
  font-size: 10px;
}

.track,
.track-inset,
.track-overlay {
  stroke-linecap: round;
}

.track {
  stroke: #dcdcdc;
  stroke-width: 10px;
}

.track-inset {
  stroke: #dcdcdc;
  stroke-width: 8px;
}

.track-overlay {
  pointer-events: stroke;
  stroke-width: 50px;
  stroke: transparent;
  cursor: crosshair;
}

.handle {
  fill: #fff;
  stroke: #000;
  stroke-opacity: 0.5;
  stroke-width: 1.25px;
}
</style>