import spots from '@/lib/table/spots';
import store from '@/store/index';

const game = {
  myBets: [],
  bank: 1000,
  play(hit) {
    this.myBets = store.getters["strategy/getStrategy"];

    console.log('myBets', this.myBets);

    this.myBets.forEach(bet => {
      let winnings;
      let betAmt = bet.get();

      // this.placeBet(betAmt);

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
          round: store.state.simulation.rounds,
          outcome: 'Won'
        });
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
          round: store.state.simulation.rounds,
          outcome: 'Lost'
        });
      }
    });
  },
};

export default game;
