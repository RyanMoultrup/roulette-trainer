import crossfilter from 'crossfilter2';

const outcomes = {
    outcomes: [],
    crossfilter: crossfilter(),
    add (outcome) {
        this.crossfilter.add([outcome]);
    },
    all () {
        return this.crossfilter.all();
    },
    get () {
        return this.crossfilter;
    },
    top (num) {
        console.log(num);
    },
    bottom (num) {
        console.log(num);
    },
    size () {
        return this.outcomes.length;
    },
    last () {
        return this.outcomes[this.outcomes.length - 1];
    },
    wonLast () {
        return this.last().outcome === 'won';
    }
}

export default outcomes;
