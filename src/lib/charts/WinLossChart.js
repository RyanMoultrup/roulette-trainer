import * as dc from 'dc';
import * as d3 from 'd3';

export default class WinLossChart {
  chart;
  dimension;
  group;
  isRendered = false;

  constructor() {
    this.chart = new dc.PieChart('#win-loss-row-chart');
  }

  render(facts) {
    // if (Object.values.length === 0) {
    //   return;
    // }

    this.dimension = facts.dimension(d => d.outcome);
    this.group = this.dimension.group().reduceCount();


    this.chart
      .width(200)
      .height(200)
      .innerRadius(35)
      .dimension(this.dimension)
      .group(this.group)
      .colors(d3.scaleOrdinal().range(['green', '#B91C1C']))
      .on('pretransition', function (chart) {
        chart.selectAll('text.pie-slice').text(function (d) {
          return d.data.key + ' ' + Math.round(dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100)) + '%';
        })
      })
      .on('filtered', chart => {
        console.log('winloss FILTERED::::::!!!!!!');
      });

      this.chart.render();
  }
}
