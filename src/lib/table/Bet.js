import spots from "@/lib/table/spots";
import Rounds from '../Outcomes';

export default class {
    spots = [];
    type;
    betPlacement;
    chips = [];

    oneToEighteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    nineteenToThirtySix = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    firstTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    secondTwelve = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    thirdTwelve = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    evenNums = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
    oddNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];

    redNums = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    blackNums = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    firstRow = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    secondRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    thirdRow = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

    payouts = {
        dbl (amt) {
            return (amt * 17) + amt;
        },
        sqr (amt) {
            return (amt * 8) + amt;
        },
        str (amt) {
            return (amt * 11) + amt;
        },
        line (amt) {
            return (amt * 5) + amt;
        },
        twelve (amt) {
            return amt * 3;
        },
        row (amt) {
            return amt * 2;
        },
        nineteen (amt) {
            return amt * 2;
        },
        one (amt) {
            return amt * 2;
        },
        even (amt) {
            return amt * 2;
        },
        odd (amt) {
            return amt * 2;
        },
        red (amt) {
            return amt * 2;
        },
        black (amt) {
            return amt * 2;
        }
    }

    strategy = {
        bet (amt) {
            return amt;
        }
    }

    constructor (bet) {
        this.chips.unshift(bet.chip);
        this.amount = +bet.chip.value;
        this.#parse(bet.placement);
    }

    addChip (chip) {
        console.log('chip:::', chip);
        console.log('addChip this.amount before:::', this.amount);
        this.chips.unshift(chip);
        this.amount = this.amount + +chip.value;
        console.log('addChip this.amount after:::', this.amount);
    }

    removeChip (index) {
        const chip = this.chips.splice(index, 1);
        console.log('removeChip++++++++', chip);
        console.log('chip.value++++++++', chip.value);
        this.amount = this.amount - +chip[0].value;
        console.log('this.amount=====------++++', this.amount);
    }

    dbl (hit) {
        if (this.spots.includes(hit)) {
            return (this.get() * 17) + this.get();
        }
    }

    sqr (hit) {
        if (this.spots.includes(hit)) {
            return (this.get()) * 8 + this.get();
        }
    }

    str (hit) {
        if (this.spots.includes(hit)) {
            return (this.get() * 11) + this.get();
        }
    }

    line (hit) {
        if (this.spots.includes(hit)) {
            return (this.get() * 5) + this.get();
        }
    }

    twelve (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 3;
        }
    }

    odd (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    even (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    red (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    black (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    row (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    one (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    nineteen (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 2;
        }
    }

    #parse (type) {
        this.betPlacement = type;
        let placedBetArr = type.split('_');

        // console.log('placementBetArr', placedBetArr);

        this.type = placedBetArr.shift();

        // console.log('bet placement name:::', this.type);

        if (this.type === 'twelve') {
            if (placedBetArr[0] === 'first') {
                console.log('first twelve+++++', this.firstTwelve);
                this.spots = this.firstTwelve;
                console.log('checking this.spots==========', this.spots);
            }

            if (placedBetArr[0] === 'second') {
                this.spots = this.secondTwelve;
            }

            if (placedBetArr[0] === 'third') {
                this.spots = this.thirdTwelve;
            }
        }

        if (this.type === 'row') {
            if (placedBetArr[0] === 'first') {
                this.spots = this.firstRow;
            }

            if (placedBetArr[0] === 'second') {
                this.spots = this.secondRow;
            }

            if (placedBetArr[0] === 'third') {
                this.spots = this.thirdRow;
            }
        }

        if (this.type === 'even') {
            this.spots = this.evenNums;
        }

        if (this.type === 'odd') {
            this.spots = this.oddNums;
        }

        if (this.type === 'red') {
            this.spots = this.redNums;
        }

        if (this.type === 'black') {
            this.spots = this.blackNums;
        }

        if (this.type === 'one') {
            this.spots = this.oneToEighteen;
        }

        if (this.type === 'nineteen') {
            this.spots = this.nineteenToThirtySix;
        }

        if (this.type === 'dbl' || this.type === 'str' || this.type === 'line' || this.type === 'sqr' || this.type === 'trip') {
            placedBetArr.forEach(item => {
                this.spots.push(parseInt(item));
            });
        }
    }

    get () {
        return this.strategy.bet(this.amount);
    }

    payout () {
        // console.log('this.amount', this.amount);
        //
        // console.log('*******************************');
        // console.log('Rounds============', Rounds);
        console.log('Rounds.last============', Rounds.last());
        return this.payouts[this.type](this.strategy.bet(this.amount));
    }

    winningSpots () {
        // console.log('winningSpots', this.spots);
        return this.spots.map(s => {
            return {
                spot: s,
                color: spots[s].color
            }
        });
    }

    name () {
        switch (this.type) {
            case 'dbl':
                return 'Split 17:1';
            case 'sqr':
                return 'Square 8:1';
            case 'line':
                return 'Six Line 5:1';
            case 'str':
                return 'Street 11:1';
            case 'twelve':
                return 'Twelve 2:1';
            case 'row':
                return 'Row 2:1';
            case 'red':
                return 'Red 1:1';
            case 'black':
                return 'Black 1:1';
            case 'even':
                return 'Even 1:1';
            case 'odd':
                return 'Odd 1:1';
            case 'one':
                return '1 To 18 1:1';
            case 'nineteen':
                return '19 To 36 1:1';
        }
    }

    betType () {
        return this.type;
    }

    placement () {
        return this.betPlacement;
    }

    collect (outcome) {
        return this[this.type](outcome);
    }
}
