import reductio from 'reductio';
import { format } from 'd3-format';
import {RowChart, BarChart, units, deregisterChart } from 'dc';
import { scaleOrdinal } from 'd3-scale';
import { range, max } from 'd3-array'
import { select } from 'd3-selection'

let total = 0

export default class Twelves {
    chart
    dimension
    group
    _width
    _height

    constructor () {
        this.chart = new RowChart("#twelves-chart")
    }

    parentWidth (width) {
        this._width = width
        return this
    }

    parentHeight (height) {
        this._height = height
        return this
    }

    #reduce () {
        const reducer = reductio()
        reducer
            .exception(d => d.round)
            .exceptionCount(true)
        reducer(this.group)
    }

    #adjustYAxisTicks (group) {
        return (chart) => {
            const maxHits = max(group.all(), d => d.value.exceptionCount)
            let numberOfTicks = maxHits > 3 ? 3 : maxHits || 1
            chart.xAxis().tickFormat(format("d")).ticks(numberOfTicks)

            if (this.group.all().length) total = this.group.all().reduce((r, i) => r + i.value.exceptionCount, 0)
        }
    }

    reset () {
        this.dimension.dispose()
        select(this.chart.root().node()).remove()
        deregisterChart(this.chart)
    }

    rescale (width, height) {
        this.chart.width(width-20).height(height-20)
        this.chart.rescale()
        this.chart.redraw()
    }

    render (facts) {
        this.dimension = facts.dimension(d => {
            if (d.hit >= 1 && d.hit <= 12) return '1st 12'
            else if (d.hit >= 13 && d.hit <= 24) return '2nd 12'
            else if (d.hit > 24) return '3rd 12'
        })

        this.group = this.dimension.group();

        this.#reduce();

        this.chart
            .width(this._width)
            .height(this._height)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .x(scaleOrdinal().domain(range(1, 38)))
            .gap(2)
            .colors(
                scaleOrdinal()
                    .domain(['odd', 'even'])
                    .range(['darkgreen', 'darkgreen'])
            )
            .colorAccessor(d => d.key ? 'Even' : 'Odd')
            .elasticX(true)
            .dimension(this.dimension)
            .group(this.group)
            .label(d => {
                const percent = Math.round((d.value.exceptionCount / total) * 100)
                return `${d.key} - ${percent}%`
            })
            .valueAccessor(d => +d.value.exceptionCount)

        this.chart
            .on('preRender', this.#adjustYAxisTicks(this.group))
            .on('preRedraw', this.#adjustYAxisTicks(this.group))

        this.chart.render();
    }
}
