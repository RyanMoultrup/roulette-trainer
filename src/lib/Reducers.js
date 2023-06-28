export const spinTable = outcomes => {
    console.log('outcomes::::reduce:::', outcomes);
    return outcomes
        .dimension(d => d.round)
        .group()
        .reduce(
            (i, d) => {
                i.hit = d.hit;

                if (d.wonRound) {
                    i.won += +d.won;
                    i.loss += 0;
                }

                if (d.lostRound) {
                    i.won += 0;
                    i.loss += +d.bet;
                }

                i.betCount++;
                i.betAmt += +d.bet;
                return i;
            },
            (i, d) => {
                i.round = d.round;

                if (d.wonRound) {
                    i.won -= +d.won;
                    i.loss -= 0;
                }

                if (d.lostRound) {
                    i.won -= 0;
                    i.loss -= d.bet;
                }

                i.betCount--;
                i.betAmt -= +d.bet;

                return i
            },
            () => {
                return {
                    round: 0,
                    won: 0,
                    loss: 0,
                    betCount: 0,
                    betAmt: 0,
                    hit: 0,
                }
            }
        )
}

// export const display = outcomes => {
//     return outcomes
//         .dimension(d => d.)
// }
export const removeEmptyBins = (fn, group) => {
    return {
        all: () => {
            return group.all().filter(d => {
                return fn(d);
            });
        }
    };
}
export default {
    spinTable,
    removeEmptyBins
}