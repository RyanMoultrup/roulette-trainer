import { range } from 'd3-array'
import { scaleOrdinal } from 'd3-scale'
import BaseRowChart from "@/lib/charts/BaseRowChart";


export default class HalfBoardSpots extends BaseRowChart {
    render (facts) {
        this.dimension = facts.dimension(d => {
            if (d.hit >= 1 && d.hit <= 18) {
                return '1 to 18';
            } else if (d.hit >= 19 && d.hit <= 36) {
                return '18 to 36';
            }
        });

        this.group = this.dimension.group();

        this.reduce();

        this.chart
            .width(this._width)
            .height(this._height)
            .margins({top: 10, right: 10, bottom: 20, left: 30})
            .x(scaleOrdinal().domain(range(1, 38)))
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
                const percent = Math.round((d.value.exceptionCount / this.total) * 100);
                return `${d.key} - ${percent}%`;
            })
            .valueAccessor(d => +d.value.exceptionCount);

        this.chart
            .on('preRender', this.adjustYAxisTicks(this.group))
            .on('preRedraw', this.adjustYAxisTicks(this.group));

        this.chart.render();
    }
}
