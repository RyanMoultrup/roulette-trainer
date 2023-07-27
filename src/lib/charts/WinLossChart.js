import { PieChart, utils } from "dc";
import { scaleOrdinal } from 'd3-scale';

export default class WinLossChart {
  chart;
  dimension;
  group;
  _width;
  _height;

  constructor() {
    this.chart = new PieChart('#win-loss-row-chart');
  }

  parentWidth (width) {
    this._width = width;
    return this;
  }

  parentHeight (height) {
    this._height = height;
    return this;
  }

  rescale (width, height) {
    this.chart.width(width-20).height(height-20);
    this.chart.redraw();
  }

  render(facts) {
    this.dimension = facts.dimension(d => d.outcome);
    this.group = this.dimension.group().reduceCount();

    this.chart
      .width(this._width)
      .height(this._height)
      .innerRadius(35)
      .dimension(this.dimension)
      .group(this.group)
      .colors(scaleOrdinal().domain(['Won', 'Lost']).range(['#15803D', '#B91C1C']))
      .on('pretransition', function (chart) {
        chart.selectAll('text.pie-slice').text(function (d) {
          return d.data.key + ' ' + Math.round(utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100)) + '%';
        })
      });

      this.chart.render();
  }
}
