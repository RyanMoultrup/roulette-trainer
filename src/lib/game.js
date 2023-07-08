import spots from '@/lib/table/spots';
import store from '@/store/index';

const buildWinObject = (...[placement, hit, winnings, bank, betAmt]) => {
  return {
    placement: placement,
    wonRound: 1,
    lostRound: 0,
    won: winnings,
    loss: 0,
    bet: betAmt,
    hit: hit,
    color: spots[hit].color,
    even: hit % 2 === 0,
    bank: bank,
    round: store.state.simulation.rounds + 1,
    outcome: 'Won'
  }
};

const buildLostObject = (...[placement, hit, , bank, betAmt]) => {
  return {
    placement: placement,
    wonRound: 0,
    lostRound: 1,
    won: 0,
    loss: betAmt,
    bet: betAmt,
    hit: hit,
    color: spots[hit].color,
    even: hit % 2 === 0,
    bank: bank,
    round: store.state.simulation.rounds + 1,
    outcome: 'Lost'
  }
}

const game = {
  play (hit) {
    const myBets = store.getters["strategy/getStrategy"];
    let bank = store.getters['bank/balance'];

    const outcomes = myBets.map(bet => {
      const betAmt = bet.get();
      const winnings = bet.collect(hit);

      bank = winnings ? bank + (winnings - betAmt) : bank - betAmt;

      const args = [bet.placement(), hit, winnings - betAmt, bank, betAmt]

      return winnings
          ? buildWinObject(...args)
          : buildLostObject(...args);
    });

    store.commit('bank/updateBank', bank);
    store.commit('simulation/addOutcome', outcomes);

    if (!store.getters['simulation/isEmitting']) {
      store.dispatch('strategy/clear');
    } else {
      store.dispatch('strategy/clear').then(() => {
        store.dispatch('strategy/replayBet');
      });
    }
  },
};

export default game;
