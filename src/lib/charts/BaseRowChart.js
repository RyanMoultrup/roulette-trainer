import { max } from 'd3-array'
import reductio from 'reductio';
import { format } from 'd3-format';
import { select } from 'd3-selection'
import { RowChart, deregisterChart } from 'dc';

export default class BaseRowChart {
    chart
    dimension
    group
    _width
    _height
    total

    constructor (el) {
        this.chart = new RowChart(el)
    }

    parentWidth (width) {
        this._width = width
        return this
    }

    parentHeight (height) {
        this._height = height
        return this
    }

    reduce () {
        const reducer = reductio()
        reducer
            .exception(d => d.round)
            .exceptionCount(true)

        reducer(this.group)
    }

    adjustYAxisTicks (group) {
        return (chart) => {
            chart.xAxis().ticks(0)
            if (group.all().length) this.total = group.all().reduce((r, i) => r + i.value.exceptionCount, 0)
        }
    }

    reset () {
        this.dimension.dispose()
        select(this.chart.root().node()).remove()
        deregisterChart(this.chart)
    }

    rescale (width, height) {
        this.chart.width(width).height(height)
        this.chart.redraw()
    }
}
