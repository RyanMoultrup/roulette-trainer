# Roulette Trainer

Roulette Trainer is just roulette that can be played rapidly and graphs the results of each game as you play
so that you can better determine which roulette strategies are better than others

![alt text](assets/roulette-trainer.png?raw=true)

### [Demo](https://roulettetrainer.io)

* [Installation](#installation)
  * [Docker](#docker)
  * [Localhost](#localhost)
* [Basic Usage](#basic-usage)
  * [Game Play](#game-play)
  * [Placing a Bet](#placing-a-bet)
  * [Removing a Bet](#removing-a-bet)
  * [Playing a Round](#playing-a-round)
  * [Last Bet](#last-bet)
  * [Double Bet](#double-bet)
* [Emitting Spins](#spin-emitting)
* [Game Play Dashboard](#game-play-dashboard)
  * [Charts](#charts)
    * [Spin Chart](#spin-chart)
    * [Won, Lost & Bank Chart](#won-lost--bank-chart)
    * [Wins & Losses Chart](#wins-and-losses-chart)
  * [Filtering Charts](#filtering-charts)
* [About Roulette Trainer](#about-roulette-trainer)

## Installation
### Docker
#### Compile and Hot-Reload with Docker for Development
First the Docker image needs to get built

```sh
docker build --target development -t roulette_trainer_dev .
```
Once the image is done building run this to start the container and access the app in your browser

```sh
docker run -it -p 5173:5173 -v $(pwd):/app roulette_trainer_dev
```
#### Or if you're using Docker Compose
```sh
docker-compose up
```

#### Compile with Docker for Production

```sh
docker build --target production -t roulette_trainer .
```

```sh
docker run -p 8080:80 -d roulette_trainer
```
### Localhost
#### Development

```sh
npm run dev
```

#### Production
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

## Game Play Dashboard
The game play dashboard gives real time feedback about the game, past spins and the total amount won and lost round over round.
### Charts

There are three main charts on the game play dashboard that will display data about the current game you're playing. The charts
will update in real time as you play. 

#### Spin Chart
This chart displays the frequency of which value hit for all the spins. This chart is useful for determining "hot" numbers or "hot"
parts of the board such as the 1st 12. 

![alt text](assets/hits-chart.png?raw=true)

#### Won, Lost & Bank Chart
This chart is actually two charts in one. The first chart with its <code>y axis</code> on the left displays the cumulative amount
of money won and lost round over round. After each round the total winnings (and losses) from the previous rounds are added 
to the total of the current round and charted. 

The charts lets you easily see if a strategy is actually a winning strategy over any number of spins. 

![alt text](assets/win-loss-bank-chart.png?raw=true)

By hovering the mouse over one of the lines in this chart will reveal more information about that specific round. This includes
information about the round, number of bets and winnings and losses, as well as the cumulative information for all rounds up-to the round hovered 
over in the chart. 

![alt text](assets/round-modal.png?raw=true)

#### Wins and Losses Chart
The wins and losses chart represents the percentage of bets places that have wither won or lost. This is not the number of rounds
won or lost but is charting each individual bet placed on the board. When there are multiple bets on the board often times only one of
those bets wins and has a payout whereas the other bets are losers. 

![alt text](assets/pie-chart.png?raw=true)

### Filtering Charts
Any of the charts in the game play dashboard can be filtered by clicking on them. This will filter the rest of the charts
and the spins display table to show only data related to the filter. For example in the image below the "Won" section of the
<code>Wins & Losses</code> pie chart was clicked. This in turn filtered the other charts to only show winning activity. In the 
Spin charts you will see that now only the winning spins are showing in the chart.

![alt text](assets/charts-filtered.png?raw=true)

## About Roulette Trainer

This mini Vue.js application is something I started as a way to get better at Vue and better understand the [reactive paradigm](https://en.wikipedia.org/wiki/Reactive_programming)
as I moved away from jQuery and starting using the modern approach. 

The idea was to integrate [Vue3](https://vuejs.org/), [Crossfilter](https://github.com/crossfilter/crossfilter) and [DC.js](https://dc-js.github.io/dc.js/) in order to create a real time dashboard that is able to 
graph the results of the game in progress as well as live filter the charts while the board is emitting.

Some features are outside of actual roulette game play and were added simply to create a more sophisticated reactive envinronment 
while learning. For example it is possible to place a bet and start emitting spins. You can then continue to "play" the game while spins are
being emitted. This includes adding more bets, doubling your bet or removing bets from the table. All the actions you take 
during spin emitting will be displayed in real time as you make the changes. 

### Known Issues
Because this is a personal project that I work on in my free time, it is not production ready yet. The following are known 
issues that will be addressed when I can get around to it. 

- ~~Placing a bet on the zero will not work~~
- Resizing is a little sketchy. The charts will adapt to the size of their parent container and will resize when the screen is resized. But when making the screen smaller the charts take multiple steps to resize which is very visible in the UI
- The roulette board is not responsive (yet) and much of the dashboard does not size well on smaller screens
  - I recently rewrote the CSS to use grids and still need to work on the media queries for different screen sizes 
- ~~If you click on the multiple charts to filter the results (yes you can do this) the <code>spins table</code> will show all the rounds individually rather than aggregated when the filters are removed from the charts~~
- If table limits are active it is possible to place an inside bet above the <code>inside bet min</code>, start emitting spins and then remove enough chips that the total <code>inside bet</code> is less than the table min
- ~~If you play a game and then want to start a new game by clicking the <code>New Game</code> button, the count of the number of rounds does not reset. So if you finished your fist game on round 23, you're next game will start on round 24~~
- ~~If you keep doubling your bet, the bet display panel will just keep adding the same chips over and over again not aggregating to higher value chips. Eventually the list of chips grows out of its container~~
- Most of the Vue code is still using the Options API because this project started a pure javascript and roulette was played in the console. It was then moved to Vue2 and eventually upgraded to Vue3
- ~~Chip values only go upto $100 which is limiting with larger starting bank values~~
- ~~If table limits are enabled the limits are not displayed anywhere on the screen~~
- ~~Number of rounds played is not currently displayed on the screen~~
