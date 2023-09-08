import { scaleOrdinal } from 'd3-scale';
import { selectAll, select } from 'd3-selection'
import BaseRowChart from "@/lib/charts/BaseRowChart";

const fire = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z"/></svg>'

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
            .on('renderlet', (chart) => {
                const total = this.total
                selectAll("#event-odd-chart.dc-chart g.row svg.icon").remove();
                selectAll("#event-odd-chart.dc-chart g.row").each(function(d) {
                    const percent = Math.round((d.value.exceptionCount / total) * 100);
                    const opacity = percent > 30 ? 0.6 : 0.8
                    if (percent < 40) {
                        // Append the icon SVG to the row.
                        select(this)
                            .append("svg")
                            .attr("width", 12)  // Set the viewport dimensions.
                            .attr("height", 12)
                            .attr("viewBox", "0 0 16 16")
                            .attr("fill", '#753310')
                            .attr("opacity", 1)
                            .attr("class", "icon")
                            .html(fire)  // `fire` is the SVG string for the icon.
                            .attr("x", -17)  // Position it to the left of the bar.
                            .attr("y", 0);
                    }
                })
            })

        this.chart.render()
    }
}
