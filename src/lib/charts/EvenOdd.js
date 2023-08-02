import reductio from 'reductio';
import spots from "../table/spots";
import { format } from 'd3-format';
import { RowChart, BarChart, units } from 'dc';
import { scaleOrdinal } from 'd3-scale';
import { range, max } from 'd3-array'


export default class EvenOdd {
    chart;
    dimension;
    group;
    _width;
    _height;

    constructor () {
        this.chart = new RowChart("#even-odd-chart");
    }

    parentWidth (width) {
        this._width = width;
        return this;
    }

    parentHeight (height) {
        this._height = height;
        return this;
    }

    #reduce () {
        const reducer = reductio();
        reducer
            .exception(d => d.round)
            .exceptionCount(true)

        reducer(this.group);
    }

    #adjustYAxisTicks (group) {
        return (chart) => {
            const maxHits = max(group.all(), d => d.value.exceptionCount);
            let numberOfTicks = maxHits > 10 ? 10 : maxHits || 1;
            chart.xAxis().tickFormat(format("d")).ticks(numberOfTicks);
        }
    }

    rescale (width, height) {
        this.chart.width(width-20).height(height-20);
        this.chart.rescale();
        this.chart.redraw();
    }

    render (facts) {
        this.dimension = facts.dimension(d => d.even);
        this.group = this.dimension.group();

        this.#reduce();

        console.log('render chart red/black::', this.group.all())

        this.chart
            .width(this._width)
            .height(this._height)
            .x(scaleOrdinal().domain(range(1, 38)))
            // .xUnits(units.ordinal)
            .gap(2)
            .colors(
                scaleOrdinal()
                    .domain(['odd', 'even'])
                    .range(['green', 'darkgreen'])
            )
            .colorAccessor(d => d.key ? 'Even' : 'Odd')
            // .brushOn(false)
            .elasticX(true)
            .dimension(this.dimension)
            .group(this.group)
            .valueAccessor(d => +d.value.exceptionCount)
            .keyAccessor(d => d.key ? 'Even' : 'Odd');

        this.chart
            .on('preRender', this.#adjustYAxisTicks(this.group))
            .on('preRedraw', this.#adjustYAxisTicks(this.group));

        this.chart.render();
    }
}
