import { PieChart, utils } from "dc";
import { scaleOrdinal } from 'd3-scale';

export default class WinLossChart {
  chart;
  dimension;
  group;

  constructor() {
    this.chart = new PieChart('#win-loss-row-chart');
  }

  render(facts) {
    this.dimension = facts.dimension(d => d.outcome);
    this.group = this.dimension.group().reduceCount();

    this.chart
      .width(200)
      .height(200)
      .innerRadius(35)
      .dimension(this.dimension)
      .group(this.group)
      .colors(scaleOrdinal().range(['#15803D', '#B91C1C']))
      .on('pretransition', function (chart) {
        chart.selectAll('text.pie-slice').text(function (d) {
          return d.data.key + ' ' + Math.round(utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100)) + '%';
        })
      });

      this.chart.render();
  }
}
