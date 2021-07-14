const Martingale = function (options) {
    console.log('options', options);
    console.log('options.limit', options.limit);

    let limit = options.limit || 0;
    let tries = 0;
    let lastBet = 0;
    let maxBetOutside = options.maxBetOutside || 0;
    // let reverse = options.reverse || false;
    // let grand = options.grand || false;

    let wonLast = () => {
        return wonLastRound;
    };

    let double = (bet) => {
        return bet * 2;
    };

    let hasLimit = () => {
        return limit > 0;
    };

    let overLimit = () => {
        return tries >= limit
    };

    let overTableLimit = () => {
        return double(lastBet) > maxBetOutside;
    };

    let bet = (amt) => {
        // console.log('Tries --- ', tries);
        // console.log('limit --- ', limit);
        if (!wonLast()) {
            // console.log('We lost-----');
            // console.log('overTableLimit', overTableLimit());
            if ((hasLimit() && overLimit()) || overTableLimit()) {
                // console.log('We are over limit---');
                tries = 0;
                lastBet = amt;
                return amt;
            }

            if (roundOutcome.length === 0 ) {
                // console.log('We are doubling bet---');
                lastBet = double(lastBet);
                tries++;
            }

            return lastBet;
        }
        // console.log('We won---');
        tries = 0;
        lastBet = amt;
        return amt;
    };

    return {
        bet
    };
};