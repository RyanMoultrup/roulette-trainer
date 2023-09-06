import { max } from 'd3-array'
import { select } from 'd3-selection'
import { pie as Pie, arc } from 'd3-shape'
import { interpolatePuBuGn } from 'd3-scale-chromatic'
import { scaleOrdinal, scaleLinear, scaleSequential } from 'd3-scale'

export default class RadialWheelChart {
    constructor(elementId) {
        this.elementId = elementId;
        this.nums = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
        this.hits = new Array(this.nums.length).fill(0);  // Initialize hits to zero for each number
        this.allHits = [];
        this._width = 275;
        this._height = 275;
    }

    #clear() {
        this.chartGroup.selectAll('*').remove();
    }

    init() {
        this.svg = select(this.elementId).append('svg')
            .attr('width', this._width)
            .attr('height', this._height);

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

        this.color = scaleOrdinal();
        this.hitScale = scaleLinear().range([this.radius - 120, this.radius - 20]);

        // Let's ensure that the domain and range have the same length
        const colorRange = ['green', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black', '#520703', 'black'];
        this.color.domain(this.nums).range(colorRange);
    }

    setData() {
        this.hitColorScale = scaleSequential(interpolatePuBuGn)
            .domain([0, max(this.hits)])

        const rouletteData = this.nums.map((num, index) => ({ number: num, hit: this.hits[index] }));

        this.hitScale.domain([0, max(this.hits)]);
        this.data = rouletteData;
    }

    domain (hits) {
        this.allHits = hits
        return this
    }

    draw() {
        this.#clear();

        // 1. Calculate the angular size of each segment.
        const segmentAngle = 2 * Math.PI / this.nums.length;

        // 2. Find the index of the 0 section in your nums array.
        const zeroIndex = this.nums.indexOf(0); // Assuming 37 represents 0.

        // 3. Calculate the necessary rotation to place the midpoint of the 0 section on top.
        const rotation = - (zeroIndex + 0.5) * segmentAngle;

        const pie = Pie()
            .value(d => 1)
            .sort(null)
            .startAngle(rotation)
            .endAngle(rotation + 2 * Math.PI);
        const arcs = pie(this.data);

        // Define arcs
        this.arc = arc().innerRadius(this.radius - 20).outerRadius(this.radius);

        // Check for hits before defining dynamicArc
        if (max(this.hits) > 0) {
            this.dynamicArc = arc().innerRadius(this.radius - 120).outerRadius(d => this.hitScale(d.data.hit));
        }

        // Append dynamic content to this.chartGroup instead of this.g
        this.pieChart = this.chartGroup.selectAll('.arc')
            .data(arcs)
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Color slices
        this.pieChart.append('path')
            .attr('d', this.arc)
            .attr('fill', d => this.color(d.data.number));

        // If there are hits, append dynamic arcs for hits
        if (max(this.hits) > 0) {
            this.pieChart.append('path')
                .attr('d', this.dynamicArc)
                .attr('fill', d => this.hitColorScale(d.data.hit));
        }

        // Define a new arc generator for the outlined ring
        const outlineArc = arc()
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
                const rotateAngle = angle - 360;
                const centroid = arc().innerRadius(this.radius - 20).outerRadius(this.radius).centroid(d);
                return `translate(${centroid}) rotate(${rotateAngle})`;
            })
            .attr('dy', '0.6em')
            .attr('dx', '-0.4em')
            .attr('font-size', '10px')
            .attr('fill', 'white')
            .text(d => d.data.number);
    }


    update() {
        // Let's simplify this logic for clarity
        const newHits = new Array(this.nums.length).fill(0);  // Initialize hits to zero for each number
        this.allHits.allFiltered().map(i => i.hit).forEach(hit => {
            if (hit === 37) hit = 0

            const hitIndex = this.nums.indexOf(hit);

            if (hitIndex !== -1) {
                newHits[hitIndex]++;
            } else {
                console.error(`Invalid hit value: ${hit}`);
            }
        })

        this.hits = newHits
        this.setData();
        this.draw();
    }

    width (width) {
        this._width = width;
        return this;
    }

    height (height) {
        this._height = height;
        return this;
    }

    rescale (width, height) {
        this._width(width)
        this._height(height)
        this.draw()
    }

    render () {
        this.init();
        this.setData();
        this.draw();
    }

    clear () {
        this.data = []
    }
}
