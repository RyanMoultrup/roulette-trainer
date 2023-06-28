import { BarChart, units } from 'dc';
import { scaleOrdinal } from 'd3-scale';
import { format } from 'd3-format';
import spots from "../table/spots";

export default class HitsChart {
    chart;
    dimension;
    group

    constructor () {
        this.chart = new BarChart("#hits-chart");
    }

    render (facts) {
        this.dimension = facts.dimension(d => +d.hit);
        this.group = this.dimension.group().reduceCount();

        this.chart
            .width(568)
            .height(200)
            .x(scaleOrdinal().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]))
            .xUnits(units.ordinal)
            .gap(2)
            .colors(
                scaleOrdinal()
                    .domain(['red', 'black', 'zero'])
                    .range(['red', 'black', 'green'])
            )
            .colorAccessor(d => {
                if (d.key === 37) {
                    return 'zero';
                }
                return spots[d.key].color
            })
            .brushOn(false)
            .elasticY(true)
            // .elasticX(true)
            .dimension(this.dimension)
            .group(this.group);
            // .valueAccessor(d => +d.value/bets.length);
            // .valueAccessor(d => +d.value);

        this.chart.yAxis().tickFormat(format("d"));
        this.chart.render();
    }
}
