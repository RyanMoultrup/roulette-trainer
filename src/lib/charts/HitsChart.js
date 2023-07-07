import { BarChart, units } from 'dc';
import { scaleOrdinal } from 'd3-scale';
import { format } from 'd3-format';
import { range } from 'd3-array'
import spots from "../table/spots";

export default class HitsChart {
    chart;
    dimension;
    group;
    _width;
    _height;

    constructor () {
        this.chart = new BarChart("#hits-chart");
    }

    parentWidth (width) {
        this._width = width;
        return this;
    }

    parentHeight (height) {
        this._height = height;
        return this;
    }

    render (facts) {
        this.dimension = facts.dimension(d => +d.hit);
        this.group = this.dimension.group().reduceCount();

        this.chart
            .width(this._width)
            .height(this._height)
            .x(scaleOrdinal().domain(range(1, 38)))
            .xUnits(units.ordinal)
            .gap(2)
            .colors(
                scaleOrdinal()
                    .domain(['red', 'black', 'zero'])
                    .range(['#B91C1C', 'black', 'green'])
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
