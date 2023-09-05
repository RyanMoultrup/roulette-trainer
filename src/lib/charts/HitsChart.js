import reductio from 'reductio';
import spots from "../table/spots";
import { format } from 'd3-format';
import { range, max } from 'd3-array'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale';
import { RowChart, BarChart, units, deregisterChart } from 'dc';


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
            let numberOfTicks = maxHits > 3 ? 3 : maxHits || 1;
            chart.yAxis().tickFormat(format("d")).ticks(numberOfTicks);
            chart.xAxis().ticks(8)
        }
    }

    reset () {
        this.dimension.dispose()
        select(this.chart.root().node()).remove()
        deregisterChart(this.chart)
    }

    rescale (width, height) {
        console.log('HITS CHART RESCALE+++++')
        this.chart.width(Math.round(width)).height(Math.round(height));
        this.chart.rescale();
        this.chart.redraw();
    }

    render (facts) {
        this.dimension = facts.dimension(d => +d.hit);
        this.group = this.dimension.group();

        this.#reduce();

        this.chart
            .width(this._width)
            .height(this._height)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .x(scaleOrdinal().domain(range(1, 38)))
            .xUnits(units.ordinal)
            .gap(1)
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
            // .brushOn(false)
            .elasticY(true)
            .dimension(this.dimension)
            .group(this.group)
            .valueAccessor(d => +d.value.exceptionCount);

        this.chart
            .on('preRender', this.#adjustYAxisTicks(this.group))
            .on('preRedraw', this.#adjustYAxisTicks(this.group));

        this.chart.render();
    }
}
