<template>
    <span>I can see it</span>
    <div id="radial-wheel"></div>
</template>

<script>
import * as d3 from 'd3'
import { onMounted } from "vue";

export default {
  components: {  },
  setup () {

    onMounted(() => {
      // Create an SVG element to hold the chart
      const svg = d3.select('#radial-wheel').append('svg')
          .attr('width', 250)
          .attr('height', 250);

      console.log('svg::', svg)

      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const radius = Math.min(width, height) / 2;

      // Center the chart
      const g = svg.append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);

      // Data for the European roulette wheel numbers
      const rouletteData = d3.range(37).map(d => ({ number: d }));

      // Create an ordinal scale for the numbers
      const color = d3.scaleOrdinal()
          .domain(rouletteData.map(d => d.number))
          .range(d3.schemeCategory10);

      // Create pie layout
      const pie = d3.pie()
          .value(d => 1)
          .sort(null);

      // Create arc
      const arc = d3.arc()
          .innerRadius(radius - 50)
          .outerRadius(radius);

      // Generate the pie chart
      const pieChart = g.selectAll('.arc')
          .data(pie(rouletteData))
          .enter().append('g')
          .attr('class', 'arc');

      // Append paths and fill with color
      pieChart.append('path')
          .attr('d', arc)
          .attr('fill', d => color(d.data.number));

      // Append text labels to each section
      pieChart.append('text')
          .attr('transform', d => `translate(${arc.centroid(d)})`)
          .attr('dy', '0.5em')
          .attr('dx', '-1.25em')
          .attr('font-size', '10px')
          .text(d => d.data.number);
    })


  }
}

</script>

<style scoped>

</style>