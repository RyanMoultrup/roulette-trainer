import * as dc from 'dc';
import * as d3 from 'd3';

export default class WinLossChart {
    chart;
    dimension;
    group

    constructor (facts) {
        this.dimension = facts.dimension(d => d.outcome);
        this.group = this.dimension.group().reduceCount();
    }

    render () {
        this.chart = new dc.PieChart('#win-loss-row-chart');

        this.chart
            .width(200)
            .height(200)
            .innerRadius(35)
            .dimension(this.dimension)
            .group(this.group)
            .colors(d3.scaleOrdinal().range(['#E5550C', 'green']))
            .on('pretransition', function(chart) {
                chart.selectAll('text.pie-slice').text(function(d) {
                    return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                })
            });

        this.chart.render();
    }
}
