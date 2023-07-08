import spots from '@/lib/table/spots';
import store from '@/store/index';

const game = {
  play (hit) {
    const myBets = store.getters["strategy/getStrategy"];
    const outcomes = [];
    let bank = store.getters['bank/balance'];

    myBets.forEach(bet => {
      let winnings;
      let betAmt = bet.get();

      winnings = bet.collect(hit);

      if (winnings) {
        bank = bank + (winnings - betAmt);
        outcomes.push({
          wonRound: 1,
          lostRound: 0,
          won: winnings - betAmt,
          loss: 0,
          bet: betAmt,
          hit: hit,
          color: spots[hit].color,
          even: hit % 2 === 0,
          bank: bank,
          round: store.state.simulation.rounds + 1,
          outcome: 'Won'
        });
      } else {
        bank = bank - betAmt;
        outcomes.push({
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
        });
      }
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
