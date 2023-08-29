import reductio from 'reductio';
import { format } from 'd3-format';
import { range, max } from 'd3-array'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale';
import {RowChart, BarChart, units, deregisterChart } from 'dc';

let total = 0

export default class EvenOdd {
    chart
    dimension
    group
    _width
    _height

    constructor () {
        this.chart = new RowChart("#even-odd-chart")
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
            let numberOfTicks = maxHits > 2 ? 2 : maxHits || 1
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
        this.dimension = facts.dimension(d => d.even)
        this.group = this.dimension.group()

        this.#reduce();

        this.chart
            .width(this._width)
            .height(this._height)
            .gap(2)
            .colors(
                scaleOrdinal()
                    .domain(['odd', 'even'])
                    .range(['#0C4F4C', '#0C4F4C'])
            )
            .colorAccessor(d => d.key ? 'Even' : 'Odd')
            .elasticX(true)
            .dimension(this.dimension)
            .group(this.group)
            .label(d => {
                const percent = Math.round((d.value.exceptionCount / total) * 100)
                return `${d.key ? 'Even' : 'Odd'} - ${percent}%`
            })
            .valueAccessor(d => +d.value.exceptionCount)
            .keyAccessor(d => d.key ? 'Even' : 'Odd')

        this.chart
            .on('preRender', this.#adjustYAxisTicks(this.group))
            .on('preRedraw', this.#adjustYAxisTicks(this.group))

        this.chart.render()
    }
}
