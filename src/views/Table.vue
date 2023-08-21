<template>
    <span>I can see it</span>
    <div id="radial-wheel"></div>
</template>

<script>
import * as d3 from 'd3'
import { onMounted } from "vue";

const nums = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]

const colorDomain = ['#6faba8', '#609491', '#517d7b', '#426664', '#334f4e', '#243837']
const bgColor = '#4A2531'

export default {
  components: {  },
  setup () {

    onMounted(() => {
      // Create an SVG element to hold the chart
      const svg = d3.select('#radial-wheel').append('svg')
          .attr('width', 275)
          .attr('height', 275);

      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const radius = Math.min(width, height) / 2;

      // Center the chart
      const g = svg.append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);

      g.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', radius)
          .attr('fill', bgColor);

      // Data for the European roulette wheel numbers
      const rouletteData = nums.map(d => ({ number: d }));

      // Create an ordinal scale for the numbers
      const color = d3.scaleOrdinal()
          .domain(rouletteData.map(d => d.number))
          .range(['green', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black']);

      // Create pie layout
      const pie = d3.pie()
          .value(d => 1)
          .sort(null);

      // Create arc
      const arc = d3.arc()
          .innerRadius(radius - 20)
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

      // Random hits for each roulette number, for demonstration
      const randomHits = rouletteData.map(() => Math.floor(Math.random() * 100));

      console.log('randomHits::', randomHits)

      // Introduce another radius for the inner circle
      const innerRadius = radius - 120;

      // Scale for the outer radius of the slice based on the number of hits
      const hitScale = d3.scaleLinear()
          .domain([0, d3.max(randomHits)])
          .range([innerRadius, radius - 20]);

      // Adjust the arc generator to have a static inner radius, but dynamic outer radius based on hits
      const dynamicArc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius((d, i) => hitScale(randomHits[i]));

      // Draw the slices for hit counts
      pieChart.append('path')
          .attr('d', dynamicArc)
          .attr('fill', d => d3.interpolatePuBuGn(randomHits[d.index] / 100)); // Adjust color based on hits

      // Define a new arc generator for the outlined ring
      const outlineArc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius);

      // Draw the outlined ring slices
      pieChart.append('path')
          .attr('d', outlineArc)
          .attr('fill', 'none')
          .attr('stroke', 'black')
          .attr('stroke-width', 0.5);

      // Append text labels to each section
      pieChart.append('text')
          .attr('transform', function(d) {
            // Calculate the angle at which to place the text in degrees
            const angle = (d.startAngle + d.endAngle) / 2 * 180 / Math.PI;
            const rotateAngle = angle - 180;  // Subtract 180 degrees to align with the 12 o'clock position

            // Set the position and rotation
            return `translate(${arc.centroid(d)}) rotate(${rotateAngle})`;
          })
          .attr('dy', '0.6em')
          .attr('dx', '-0.4em')
          .attr('font-size', '9px')
          .attr('fill', 'white')
          .text(d => d.data.number);
    })
  }
}

</script>

<style scoped>

</style>