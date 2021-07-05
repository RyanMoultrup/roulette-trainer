import spots from "@/lib/table/spots";

export default class {
    spots = [];
    type;
    betPlacement;

    payouts = {
        dbl (amt) {
            return amt * 17
        },
        sqr (amt) {
            return amt * 8
        },
        str (amt) {
            return amt * 11
        },
        line (amt) {
            return amt * 5
        }
    }

    bets = {
        single (hit, betAmount, betPlacement) {
            if (betPlacement.includes(hit)) {
                return betAmount * 35;
            }
        },
        street (hit, betAmount, betPlacement) {
            if (betPlacement.includes(hit)) {
                return betAmount * 11;
            }
        },
        square (hit, betAmount, betPlacement) {
            if (betPlacement.includes(hit)) {
                return betAmount * 8;
            }
        },
        sixLine (hit, betAmount, betPlacement) {
            if (betPlacement.includes(hit)) {
                return betAmount * 5;
            }
        },
        firstTwelve (hit, betAmount) {
            const f12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            if (f12.includes(hit)) {
                return betAmount * 3;
            }
        },
        secondTwelve (hit, betAmount) {
            const s12 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            if (s12.includes(hit)) {
                return betAmount * 3;
            }
        },
        thirdTwelve (hit, betAmount) {
            const t12 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            if (t12.includes(hit)) {
                return betAmount * 3;
            }
        },
        oneToEighteen (hit, betAmount) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
            if (nums.includes(hit)) {
                return betAmount * 2;
            }
        },
        nineteenToThirtySix (hit, betAmount) {
            const nums = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            if (nums.includes(hit)) {
                return betAmount * 2;
            }
        },
        topRow (hit, betAmount) {
            const nums = [3, 6, 12, 15, 18, 21, 24, 27, 30, 33, 36];
            if (nums.includes(hit)) {
                return betAmount * 3;
            }
        },
        middleRow (hit, betAmount) {
            const nums = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
            if (nums.includes(hit)) {
                return betAmount * 3;
            }
        },
        bottomRow (hit, betAmount) {
            const nums = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
            if (nums.includes(hit)) {
                return betAmount * 3;
            }
        },
        isRed (hit, betAmount) {
            if (spots[hit].color === 'red') {
                return betAmount * 2;
            }
        },
        isBlack (hit, betAmount) {
            if (spots[hit].color === 'black') {
                return betAmount * 2;
            }
        },
        isEven (hit, betAmount) {
            if (hit % 2 === 0) {
                return betAmount * 2;
            }
        },
        isOdd (hit, betAmount) {
            if (hit % 2 !== 0 && hit !==37) {
                return betAmount * 2;
            }
        },
        isZero (hit, betAmount) {
            if (hit === 37) {
                return betAmount * 17;
            }
        },
    }

    strategy = {
        bet (amt) {
            return amt;
        }
    }

    constructor(type, chip) {
        console.log('chip::',chip);
        this.chip = chip;
        this.amount = +chip.value;
        this.#parse(type);
        // this.payoutCallback = this.bets[type];
    }

    dbl (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 17;
        }
    }

    sqr (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 8;
        }
    }

    str (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 11;
        }
    }

    line (hit) {
        if (this.spots.includes(hit)) {
            return this.get() * 5;
        }
    }

    #parse (type) {
        this.betPlacement = type;
        let placedBetArr = type.split('_');

        this.type = placedBetArr.shift();

        if (this.type === 'dbl' || this.type === 'str' || this.type === 'line' || this.type === 'sqr') {
            placedBetArr.forEach(item => {
                this.spots.push(parseInt(item));
            });
        }
    }

    get () {
        return this.strategy.bet(this.amount);
    }

    payout () {
        console.log('this.amount', this.amount);
        return this.payouts[this.type](this.strategy.bet(this.amount));
    }

    winningSpots () {
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
