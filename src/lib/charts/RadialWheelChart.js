import * as d3 from 'd3';

export default class RadialWheelChart {
    constructor(elementId) {
        this.elementId = elementId;
        this.init();
    }

    init() {
        this.svg = d3.select(`#${this.elementId}`).append('svg')
            .attr('width', 275)
            .attr('height', 275);

        this.width = +this.svg.attr('width');
        this.height = +this.svg.attr('height');
        this.radius = Math.min(this.width, this.height) / 2;

        this.g = this.svg.append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

        // Background circle
        this.g.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', this.radius)
            .attr('fill', '#4A2531'); // Color of the background

        this.color = d3.scaleOrdinal();
        this.hitScale = d3.scaleLinear().range([this.radius - 120, this.radius - 20]);
    }

    setData(nums, hits) {
        const rouletteData = nums.map((num, index) => ({ number: num, hit: hits[index] }));
        this.color.domain(rouletteData.map(d => d.number))
            .range(['green', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black']);

        this.hitScale.domain([0, d3.max(hits)]);
        this.data = rouletteData;
    }

    render() {
        const pie = d3.pie().value(d => 1).sort(null);
        const arcs = pie(this.data);

        // Define arcs
        this.arc = d3.arc().innerRadius(this.radius - 20).outerRadius(this.radius);
        this.dynamicArc = d3.arc().innerRadius(this.radius - 120).outerRadius(d => this.hitScale(d.data.hit));

        this.pieChart = this.g.selectAll('.arc')
            .data(arcs)
            .enter().append('g')
            .attr('class', 'arc');

        // Color slices
        this.pieChart.append('path')
            .attr('d', this.arc)
            .attr('fill', d => this.color(d.data.number));

        // Dynamic arcs for hits
        this.pieChart.append('path')
            .attr('d', this.dynamicArc)
            .attr('fill', d => d3.interpolatePuBuGn(d.data.hit / 100));

        // Define a new arc generator for the outlined ring
        const outlineArc = d3.arc()
            .innerRadius(this.radius - 120)
            .outerRadius(this.radius);

        // Adding spokes between sections
        this.pieChart.append('path')
            .attr('d', outlineArc)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);

        // Text labels
        this.pieChart.append('text')
            .attr('transform', d => {
                const angle = (d.startAngle + d.endAngle) / 2 * 180 / Math.PI;
                const rotateAngle = angle - 180;
                const centroid = d3.arc().innerRadius(this.radius - 20).outerRadius(this.radius).centroid(d);
                return `translate(${centroid}) rotate(${rotateAngle})`;
            })
            .attr('dy', '0.6em')
            .attr('dx', '-0.4em')
            .attr('font-size', '9px')
            .attr('fill', 'white')
            .text(d => d.data.number);
    }
}
