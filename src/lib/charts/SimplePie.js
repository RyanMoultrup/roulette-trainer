import * as d3 from 'd3';

export class SimplePie {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;
        this.width = 130;
        this.height = 110;
        this.radius = Math.min(this.width, this.height) / 2;
        this.colorMap = {
            'Won': '#991b1b',
            'Lost': '#15803D'
        }
    }

    render() {
        // Create SVG container
        const svg = d3.select(this.selector)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

        // Create pie chart layout
        const pie = d3.pie()
            .value((d) => d.value)
            .sort(null);

        // Define arc generator
        const arc = d3.arc()
            .innerRadius(15)
            .outerRadius(this.radius);

        // Create arc for each slice of the pie
        const g = svg.selectAll('.arc')
            .data(pie(this.data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Append path and set color
        g.append('path')
            .attr('d', arc)
            .style('fill', d => this.colorMap[d.data.label])
            .transition()
            .ease(d3.easeLinear)
            .duration(800)
            .attrTween('d', (d) => {
                const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return (t) => {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });

        // Append text labels
        g.append('text')
            .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
            .attr('dy', '.1em')
            .text((d) => `${d.data.value}%`)
            .style('fill', 'white')
            .style('font-size', '12px');
    }
}

export const simplePie = (selector, data) => new SimplePie(selector, data);
