import { scaleOrdinal } from 'd3-scale';
import BaseRowChart from "@/lib/charts/BaseRowChart";

export default class EvenOdd extends BaseRowChart {
    render (facts) {
        this.dimension = facts.dimension(d => d.even)
        this.group = this.dimension.group()

        this.reduce();

        this.chart
            .width(this._width)
            .height(this._height)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
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
                const percent = Math.round((d.value.exceptionCount / this.total) * 100)
                return `${d.key ? 'Even' : 'Odd'} - ${percent}%`
            })
            .valueAccessor(d => +d.value.exceptionCount)

        this.chart
            .on('preRender', this.adjustYAxisTicks(this.group))
            .on('preRedraw', this.adjustYAxisTicks(this.group))

        this.chart.render()
    }
}
