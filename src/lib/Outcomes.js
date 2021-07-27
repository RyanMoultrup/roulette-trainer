import crossfilter from 'crossfilter2';

class Outcomes {
    outcomes = [];

    constructor (crossfilter) {
        // this.crossfilter = crossfilter([{
        //     wonRound: 0,
        //     lostRound: 0,
        //     won: 0,
        //     loss: 0,
        //     bet: 0,
        //     hit: 0,
        //     color: 0,
        //     even: 0,
        //     bank: 0,
        //     round: 0,
        //     outcome: 0
        // }]);
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
