import spots from "./spots";
import Bet from "./Bet";
import emitter from "../EventEmitter";

const myBets = [];

const placeBet = (event) => {
    console.log('amount', event.amount);
    console.log('name', event.name);
    console.log('Bet has been placed!++++++++++++++')
    myBets.push(new Bet(event.amount, getCallback(event.name)));
    console.log('myBets', myBets);
}

emitter.on('betPlaced', placeBet);


const getCallback = function (name) {
    switch (name) {
        case 'dbl_3_6':
            return bets.split([3, 6]);
    }
}

const get = () => {
    return myBets;
}

const bets = {
    single (hit, betAmount, betPlacement) {
        if (betPlacement.includes(hit)) {
            return betAmount * 35;
        }
    },
    split (betPlacement) {
        let placement = betPlacement;
        return (hit, betAmount) => {
            console.log('payoutCallback hit', hit);
            console.log('payoutCallback betAmt', betAmount);
            console.log('payoutCallback placement', placement);
            if (placement.includes(hit)) {
                return betAmount * 17;
            }
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
};

export { bets, get };