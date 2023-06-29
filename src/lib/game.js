import spots from '@/lib/table/spots';
import store from '@/store/index';

let bank;

const game = {
  myBets: [],
  bank: 1000,
  play (hit) {
    this.myBets = store.getters["strategy/getStrategy"];

    this.myBets.forEach(bet => {
      let winnings;
      let betAmt = bet.get();

      console.log('betAmt:::', bet.get());

      winnings = bet.collect(hit);

      if (winnings) {
        store.dispatch('bank/depositWinnings', { winnings, betAmt });
        bank = store.getters['bank/balance'];
        store.commit('simulation/addOutcome', {
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
        store.commit('bank/subtract', betAmt);
        bank = store.getters['bank/balance'];
        store.commit('simulation/addOutcome', {
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

      if (!store.getters['simulation/isEmitting']) {
        store.dispatch('strategy/clear');
      }
    });
  },
};

export default game;
