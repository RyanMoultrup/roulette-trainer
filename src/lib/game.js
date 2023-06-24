import spots from '@/lib/table/spots';
import store from '@/store/index';

const game = {
  myBets: [],
  bank: 1000,
  play (hit) {
    this.myBets = store.getters["strategy/getStrategy"];

    this.myBets.forEach(bet => {
      let winnings;
      let betAmt = bet.get();

      winnings = bet.collect(hit);

      if (winnings) {
        store.commit('simulation/addOutcome', {
          wonRound: 1,
          lostRound: 0,
          won: winnings - betAmt,
          loss: 0,
          bet: betAmt,
          hit: hit,
          color: spots[hit].color,
          even: hit % 2 === 0,
          bank: this.bank,
          round: store.state.simulation.rounds + 1,
          outcome: 'Won'
        });
        store.dispatch('bank/depositWinnings', { winnings, betAmt });
      } else {
        store.commit('simulation/addOutcome', {
          wonRound: 0,
          lostRound: 1,
          won: 0,
          loss: betAmt,
          bet: betAmt,
          hit: hit,
          color: spots[hit].color,
          even: hit % 2 === 0,
          bank: this.bank,
          round: store.state.simulation.rounds + 1,
          outcome: 'Lost'
        });
        store.commit('bank/subtract', betAmt);
      }

      store.commit('strategy/clear');
    });
  },
};

export default game;
