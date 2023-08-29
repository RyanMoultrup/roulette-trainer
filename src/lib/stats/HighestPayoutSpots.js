export const highestPayout = bets => {
    const [spots, betAmt] = bets.reduce(([spots, betAmt], b) => {
        betAmt += b.amount
        b.winningSpots().forEach(({spot, color}) => {
            if (spots[spot]) {
                spots[spot].payout += b.payout()
                spots[spot].totalBet += b.amount
                spots[spot].bets.push(b)
            } else {
                spots[spot] = {}
                spots[spot].bets = []
                spots[spot].bets.push(b)
                spots[spot].payout = b.payout()
                spots[spot].totalBet = b.amount
                spots[spot].color = color
            }
        })
        return [spots, betAmt]
    }, [{}, 0])

    return Object.entries(spots).map(([spot, meta]) => {
        const profit = { profit: meta.payout - betAmt }
        return { spot: spot, ...meta, ...profit}
    }).sort((a, b) => b.profit - a.profit)
}

export default highestPayout