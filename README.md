# Roulette Trainer

Roulette Trainer is just roulette that can be played rapidly and graphs the results of each game as you play
so that you can better determine which roulette strategies are better than others

![alt text](assets/roulette-trainer.png?raw=true)

## Installation
### Compile and Hot-Reload with Docker for Development

```sh
npm run dev
```

### Compile and Minify with Docker for Production

```sh
npm run build
```
## Basic Usage

Roulette trainer is designed to simulate real roulette play as closely as can be done with software. 

### Game Play
Play Roulette Trainer just like you would roulette at the casino. Select a chip by clicking on and then place the chip on 
the roulette board to place a bet. You can place multiple bets on the same spot on the board by clicking on the chip in the
spot you would like to place your second bet. 

#### Placing a Bet
Once a bet is placed you'll see all your current bets in the right hand bets display panel. This will show you the winning
spots for each bet as well as what the payout will be if you win

#### Removing a bet
There are two ways of removing a bet from the game board. To remove all the bets from a spot on the board you can do this from
the bets display panel by hovering over the bet you want to remove and then clicking the 'X' that appears in the upper right corner.
This will remove all the bets that occupy that particular spot on the board. 

To remove a single chip from a spot on the board with multiple chips on it, hover you mouse over the chips and a panel will open
up that will allow you remove a single chip.

#### Playing a Round
After you've placed your bets, to play a round, just hit the spin button. This will generate a random spin on the wheel and update
all the game stats on the game play dashboard. 

#### Last Bet
Once a round has been played and your winnings or loss have been updated, you can place another bet on the board by selecting chips
and placing more bets. Additionally, if you'd like to replay your last bet you can click the <code>Last Bet</code> button
and the last bet you placed will be added back to the board.

#### Double Bet
A common strategy in roulette is to double the bet if you lost the last round to try and recoup the losses. If you want to double
your bet click the <code>2X Bet</code> button and the values of each of you bets on the board will be doubled. 

If you have table limits turned on you may not be able to double all your bets on the board if doubling the bet would exceed the 
max limit for the type of bet you're trying to place i.e. if you doubled your bet on <code>red</code> it would exceed the outside bet table limit.
In this case the doubling the bet would be denied. However, if you have other bets on the table that can be doubled without exceeding 
a table limit that bet that would not exceed the limit will get doubled and the bet that would exceed the limit is rejected.

### Spin Emitting
Spin emitting is not a feature of traditional roulette play. This feature is to quickly run through spins in order to see how
a particular roulette strategy will play out over time. 

For example, in the image below is a common betting pattern where there are only two losing spots on the board.

![alt text](assets/spin-emit.png?raw=true)

In this example the <code>spin emitter</code> was turned on for 30 rounds and the results are charted in the game play dashboard.

In the game play charts you can clearly see with this particular betting strategy that the cumulative total wins and total losses
stays about the same from round to round. 

![alt text](assets/emit-red.png?raw=true)

This example would be a bet only on red, also played out over 30 rounds. 

![alt text](assets/emit-max-num.png?raw=true)

Finally, a high payout inside bet also played out over 30 rounds.

## About Roulette Trainer

This mini Vue.js application is something I started as a way to get better at Vue and better understand the reactive paradigm
as I moved away from jQuery and starting using the modern approach. 

The idea was to integrate Vue3, Crossfilter and DC.js in order to create a real time dashboard that is able to 
graph the results of the game in progress as well as live filter the charts while the board is emitting (more on this later)


