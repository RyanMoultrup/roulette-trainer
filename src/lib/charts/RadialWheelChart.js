import * as d3 from 'd3';

export default class RadialWheelChart {
    constructor(elementId) {
        this.elementId = elementId;
        this.init();

        // Assuming a fixed set of numbers for a roulette wheel
        this.nums = [37, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
        this.hits = new Array(this.nums.length).fill(0);  // Initialize hits to zero for each number
        this.setData();  // Set initial data state
    }

    clear() {
        this.chartGroup.selectAll('*').remove();
    }

    init() {
        this.svg = d3.select(this.elementId).append('svg')
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

        this.chartGroup = this.g.append('g')

        this.color = d3.scaleOrdinal();
        this.hitScale = d3.scaleLinear().range([this.radius - 120, this.radius - 20]);
    }

    setData() {
        this.hitColorScale = d3.scaleSequential(d3.interpolatePuBuGn)
            .domain([0, d3.max(this.hits)])

        const rouletteData = this.nums.map((num, index) => ({ number: num, hit: this.hits[index] }));

        // Let's ensure that the domain and range have the same length
        const colorRange = ['green', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black'];
        this.color.domain(rouletteData.map(d => d.number)).range(colorRange);

        this.hitScale.domain([0, d3.max(this.hits)]);
        this.data = rouletteData;
    }

    render() {
        this.clear();

        const pie = d3.pie().value(d => 1).sort(null);
        const arcs = pie(this.data);

        // Define arcs
        this.arc = d3.arc().innerRadius(this.radius - 20).outerRadius(this.radius);
        this.dynamicArc = d3.arc().innerRadius(this.radius - 120).outerRadius(d => this.hitScale(d.data.hit));

        // Append dynamic content to this.chartGroup instead of this.g
        this.pieChart = this.chartGroup.selectAll('.arc')
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
            .attr('fill', d => this.hitColorScale(d.data.hit));

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

    update(hit) {
        // Let's simplify this logic for clarity
        // if (hit === 37) {
        //     hit = 0;
        // }

        const hitIndex = this.nums.indexOf(hit);
        if (hitIndex !== -1) {
            this.hits[hitIndex]++;

            this.setData();
            this.render();
        } else {
            console.error(`Invalid hit value: ${hit}`);
        }

    }

}
