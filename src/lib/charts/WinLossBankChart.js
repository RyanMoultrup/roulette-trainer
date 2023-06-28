import { CompositeChart, LineChart, legend } from "dc";
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
// import { tip as d3tip } from "d3-v6-tip";

export default class WinLossBankChart {
    chart;
    group;
    dimension;
    accumulatedGroup;
    winChart;
    lossChart;
    bankChart;

    reducer = {
        add (i, d) {
            i.loss += +d.loss;
            i.won += +d.won;
            i.round = d.round;
            i.bank = d.bank;
            i.roundsWon += +d.wonRound;
            i.roundsLost += +d.lostRound;
            ++i.betCount;
            return i;
        },
        remove (i, d) {
            i.loss -= +d.loss;
            i.won -= +d.won;
            i.round = d.round;
            i.bank = d.bank;
            i.roundsWon -= +d.wonRound;
            i.roundsLost -= +d.lostRound;
            --i.betCount;
            return i;
        },
        init () {
            return {
                round: 0,
                won: 0,
                loss: 0,
                bank: 0,
                roundsWon: 0,
                roundsLost: 0,
                betCount: 0
            };
        }
    };

    constructor () {
        this.chart = new CompositeChart("#win-loss-chart");
    }

    _buildWinChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('green')
            .group(this.accumulatedGroup, "Won")
            .valueAccessor(d => +d.value.won);
    }

    _buildLossChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('red')
            .group(this.accumulatedGroup, "Loss")
            .valueAccessor(d => +d.value.loss);
    }

    _buildBankChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('#ccd3f9')
            .group(this.accumulatedGroup, "Bank")
            .valueAccessor(d => d.value.bank)
            .useRightYAxis(true)
            .renderArea(true)
            .curve(curveCardinal);
    }

    _calculateWinPercentage (data) {
        return Math.round((data.data.value.roundsWon / data.data.value.cumBets) * 100);
    }

    _calculateLossPercentage (data) {
        return Math.round((data.data.value.roundsLost / data.data.value.cumBets) * 100);
    }

    _accumulate (group) {
        return {
            all () {
                let won = 0;
                let loss = 0;
                let roundsWon = 0;
                let roundsLost = 0;
                let bank = 0;
                let betCount = 0;
                let cumBets = 0;

                return group.all().map(d => {
                    won += +d.value.won;
                    loss += +d.value.loss;
                    roundsWon += +d.value.roundsWon;
                    roundsLost += +d.value.roundsLost;
                    bank = +d.value.bank;
                    betCount = +d.value.betCount;
                    cumBets += +d.value.betCount;
                    return {
                        key: d.key,
                        value: {
                            won,
                            loss,
                            roundsWon,
                            roundsLost,
                            bank,
                            betCount,
                            cumBets,
                        }
                    }
                });
            }
        }
    }

    _group () {
        return this.dimension.group().reduce(
            this.reducer.add,
            this.reducer.remove,
            this.reducer.init
        );
    }

    render (facts) {
        this.dimension = facts.dimension(d => d.round);
        let group = this._group();
        this.accumulatedGroup = this._accumulate(group);

        console.log('bank chart RENDER:::::', group);

        // const winTip = d3tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0])
        //     .html((d, i) => {
        //         console.log('winTip', i);
        //         return `<span><strong>Round ${i.data.key}</strong></span><br>
        //                 <span><strong>Bets:</strong> ${i.data.value.betCount}</span><br><br>
        //                 <span><strong>Total Won:</strong> $${i.data.value.won}</span><br>
        //                 <span><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span><br><hr>
        //                 <span><strong>Total Bets:</strong> ${i.data.value.cumBets}</span><br>
        //                 <span><strong>Win Percent:</strong> ${this._calculateWinPercentage(i)}%</span><br>
        //                 <span><strong>Loss Percent:</strong> ${this._calculateLossPercentage(i)}%</span>`;
        //     });
        //
        // const lossTip = d3tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0])
        //     .html((d, i) => {
        //         return `<span><strong>Round ${i.data.key}</strong></span><br>
        //                 <span><strong>Bets:</strong> ${i.data.value.betCount}</span><br><br>
        //                 <span><strong>Total Lost:</strong> $${i.data.value.loss}</span><br>
        //                 <span><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span><br><hr>
        //                 <span><strong>Total Bets:</strong> ${i.data.value.cumBets}</span><br>
        //                 <span><strong>Win Percent:</strong> ${this._calculateWinPercentage(i)}%</span><br>
        //                 <span><strong>Loss Percent:</strong> ${this._calculateLossPercentage(i)}%</span>`;
        //     });
        //
        // const bankTip = d3tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0])
        //     .html((d, i) => {
        //         return `<span>Bank: $${i.data.value.bank}</span>`;
        //     });

        this.winChart = this._buildWinChart();
        this.lossChart = this._buildLossChart();
        this.bankChart = this._buildBankChart();

        this.chart
            .width(468)
            .height(200)
            .margins({top: 15, right: 60, bottom: 10, left: 50})
            .x(scaleLinear().domain([1, this.dimension.group().size()]))
            .yAxisLabel("$ Won / Lost")
            .rightYAxisLabel('Bank')
            .legend(legend().x(80).y(20).itemHeight(13).gap(5))
            // .renderHorizontalGridLines(true)
            .renderTitle(false)
            .elasticX(true)
            .elasticY(true)
            .compose([
                this.bankChart,
                this.winChart,
                this.lossChart
            ])
            .brushOn(false);

        this.chart.yAxis().tickFormat(d => `$${d}`);
        this.chart.rightYAxis().tickFormat(d => `$${d}`);


        this.chart.render();

        // console.log('winlossbankchart winTip', winTip);

        // this.winChart.selectAll('g.sub._1 circle.dot').call(winTip);
        // this.winChart.selectAll('g.sub._1 circle.dot')
        //     .on('mouseover.tooltip', winTip.show)
        //     .on('mouseout.tooltip', winTip.hide);
        //
        // this.lossChart.selectAll('g.sub._2 circle.dot').call(lossTip);
        // this.lossChart.selectAll('g.sub._2 circle.dot')
        //     .on('mouseover.tooltip', lossTip.show)
        //     .on('mouseout.tooltip', lossTip.hide);
        //
        // this.bankChart.selectAll('g.sub._0 circle.dot').call(bankTip);
        // this.bankChart.selectAll('g.sub._0 circle.dot')
        //     .on('mouseover.tooltip', bankTip.show)
        //     .on('mouseout.tooltip', bankTip.hide);

        // this.bankChart.selectAll('path.area').style('linear-gradient(90deg, rgba(133,114,244,0.24693627450980393) 0%, rgba(94,0,255,1) 100%)')
    }
}
