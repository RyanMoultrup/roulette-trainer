class Outcomes {
    outcomes = [];

    add (outcome) {
        this.outcomes.unshift(outcome);
    }

    all () {
        return this.outcomes;
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

export default new Outcomes;
