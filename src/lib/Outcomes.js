import crossfilter from 'crossfilter2';

class Outcomes {
    outcomes = [];

    constructor (crossfilter) {
        this.crossfilter = crossfilter();
    }

    add (outcome) {
        this.crossfilter.add([outcome]);
    }

    all () {
        return this.crossfilter.all();
    }

    get () {
        return this.crossfilter;
    }

    top (num) {
        console.log(num);
    }

    bottom (num) {
        console.log(num);
    }

    size () {
        return this.outcomes.length;
    }

    last () {
        return this.outcomes[this.outcomes.length - 1];
    }

    wonLast () {
        return this.last().outcome === 'won';
    }
}

export default new Outcomes(crossfilter);
