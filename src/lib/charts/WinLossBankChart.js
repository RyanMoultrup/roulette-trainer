import { CompositeChart, LineChart, legend } from "dc";
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import { tip as d3tip } from "d3-v6-tip";
import spots from "@/lib/table/spots";
import { names } from '@/lib/table/BetPlacements'
import { simplePie } from "@/lib/charts/SimplePie";

export default class WinLossBankChart {
    chart;
    group;
    dimension;
    accumulatedGroup;
    winChart;
    lossChart;
    bankChart;
    _width;
    _height;

    reducer = {
        add (i, d) {
            i.loss += +d.loss;
            i.won += +d.won;
            i.round = d.round;
            i.bank = d.bank;
            i.roundsWon += +d.wonRound;
            i.roundsLost += +d.lostRound;
            i.hit = +d.hit;
            ++i.betCount;

            i.bets.push({
                placement: d.placement,
                outcome: d.outcome,
                won: +d.won,
                loss: +d.loss,
                bet: +d.bet
            });

            return i;
        },
        remove (i, d) {
            i.loss -= +d.loss;
            i.won -= +d.won;
            i.round = d.round;
            i.bank = d.bank;
            i.roundsWon -= +d.wonRound;
            i.roundsLost -= +d.lostRound;
            i.hit = +d.hit;
            --i.betCount;

            i.bets = i.bets.filter(item => item.placement !== d.placement);

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
                betCount: 0,
                hit: 0,
                bets: []
            };
        }
    };

    constructor () {
        this.chart = new CompositeChart("#win-loss-chart");
    }

    _buildWinChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('#1CB052')
            .group(this.accumulatedGroup, "Won")
            .renderDataPoints(true)
            .valueAccessor(d => +d.value.won);
    }

    _buildLossChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('red')
            .group(this.accumulatedGroup, "Loss")
            .renderDataPoints(true)
            .valueAccessor(d => +d.value.loss);
    }

    _buildBankChart () {
        return new LineChart(this.chart)
            .dimension(this.dimension)
            .colors('#10632F')
            .group(this.accumulatedGroup, "Bank")
            .valueAccessor(d => d.value.bank)
            .useRightYAxis(true)
            .renderArea(true)
            .curve(curveCardinal);
    }

    _calculateWinPercentage ({ roundsWon, cumBets }) {
        return Math.round((roundsWon / cumBets) * 100);
    }

    _calculateLossPercentage ({ roundsLost, cumBets }) {
        return Math.round((roundsLost / cumBets) * 100);
    }

    _accumulate (group) {
        return {
            all () {
                const obj = {
                    won: 0,
                    loss: 0,
                    roundsWon: 0,
                    roundsLost: 0,
                    bank: 0,
                    betCount: 0,
                    cumBets: 0,
                    hit: 0,
                    bets: []
                }

                return group.all().map(d => {
                    obj.won += +d.value.won;
                    obj.loss += +d.value.loss;
                    obj.roundsWon += +d.value.roundsWon;
                    obj.roundsLost += +d.value.roundsLost;
                    obj.bank = +d.value.bank;
                    obj.betCount = +d.value.betCount;
                    obj.cumBets += +d.value.betCount;
                    obj.hit = +d.value.hit;
                    obj.bets = d.value.bets;

                    return {
                        key: d.key,
                        value: { ...obj }
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

    rescale (width, height) {
        this.chart.width(width-30).height(height-20);
        this.chart.rescale();
        this.chart.redraw();
    }

    parentWidth (width) {
        this._width = width;
        return this;
    }

    parentHeight (height) {
        this._height = height;
        return this;
    }

    render (facts) {
        this.dimension = facts.dimension(d => d.round);
        let group = this._group();
        this.accumulatedGroup = this._accumulate(group);


        const winTip = d3tip()
            .direction('s')
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d, i) => {
                const colorClass = spots[i.data.value.hit].color === 'red' ? 'bg-red-800' : 'bg-black';

                const tipData = {
                    ...i.data.value,
                    colorClass,
                    winPercent: this._calculateWinPercentage(i.data.value),
                    lossPercent: this._calculateLossPercentage(i.data.value)
                };

                const betOutcomes = tipData.bets.map(bet => {
                    const [placementId] = bet.placement.split('_');
                    return {
                        name: names[placementId],
                        outcome: bet.outcome,
                        won: bet.won,
                        loss: bet.loss,
                        bet: bet.bet
                    }
                });

                let betOutcomesHTML = '<div class="mt-2 w-80 p-2">';
                let totalWon = 0;

                betOutcomes.forEach(outcome => {
                    console.log('outcome:::', outcome);
                    betOutcomesHTML += `
                        <div class="flex flex-col border-b border-b-green-600">
                            <div class="flex flex-row justify-between">
                               <span style="color: #D49228;" class="mr-2 font-bold">${outcome.name}</span>
                               <span class="mr-2 font-bold"><span class="font-normal">bet</span> $${outcome.bet}</span>
                               <span class="mr-1 lowercase">${outcome.outcome}</span>
                               <span class="font-bold">$${outcome.outcome === 'Won' ? outcome.won : outcome.loss}</span>
                            </div> 
                        </div>`;
                    totalWon += outcome.won;
                    totalWon -= outcome.loss;
                });

                betOutcomesHTML += '</div>';

                return `
                    <div class="flex flex-col rounded">
                        <div class="flex flex-row items-center bg-green-500 justify-center p-4">
                          <div class="flex-shrink-0 h-8 w-8 ">
                            <span class="${colorClass} h-8 w-8 pt-1 rounded-full text-white text-center inline-block">${i.data.value.hit}</span>
                          </div>
                          <span class="font-lobster text-3xl ml-2">Round ${i.data.key}</span><br>
                        </div>
                        
                        <div class="px-5 pb-5 flex flex-row bg-gradient-to-tr from-green-700 via-green-800 to-green-800 border border-green-800 shadow">
                            <div class="px-4 border-r border-r-green-700">
                              <div class="font-lobster text-2xl text-green-500">This Round</div>
                              <span class="mb-3"><strong>Bets:</strong> ${i.data.value.betCount}</span>
                              ${betOutcomesHTML}
                              <span class="font-lobster text-2xl">Total Won $${totalWon}</span>
                            </div>
                            <div class="border-l border-l-green-900 px-4 pb-4">
                                <div class="flex flex-row items-end">
                                    <div class="flex flex-col">
                                        <div class="font-lobster text-2xl text-green-500">All Rounds</div>
                                        <span class="mb-3"><strong>Total Bets:</strong> ${i.data.value.cumBets}</span>
                                      <span><strong>Total Won:</strong> $${i.data.value.won}</span>
                                      <span><strong>Total Lost:</strong> $${i.data.value.loss}</span>
                                      <spa class="mb-2"><strong>Winnings:</strong> $${i.data.value.won - i.data.value.loss}</span>
                                    </div>
                                    <div>
                                        <div id="tip-pie" class="text-gray-200 mt-2" style="height: 112px;"></div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>`;
            });

        const bankTip = d3tip()
            .direction('s')
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d, i) => {
                return `<span>Bank: $${i.data.value.bank}</span>`;
            });

        this.winChart = this._buildWinChart();
        this.lossChart = this._buildLossChart();
        this.bankChart = this._buildBankChart();

        this.chart
            .width(this._width)
            .height(this._height)
            .margins({top: 15, right: 60, bottom: 10, left: 50})
            .x(scaleLinear().domain([1, this.dimension.group().size()]))
            .yAxisLabel("$ Won / Lost")
            .rightYAxisLabel('Bank')
            .legend(legend().x(80).y(20).itemHeight(13).gap(5))
            .renderTitle(false)
            .elasticX(true)
            .elasticY(true)
            .compose([
                this.bankChart,
                this.winChart,
                this.lossChart
            ])
            .brushOn(false);

        this.chart.yAxis().tickFormat(d => `$${d}`).ticks(10);
        this.chart.rightYAxis().tickFormat(d => `$${d}`).ticks(10);

        this.chart
            .on('postRedraw', chart => {
                this.winChart.selectAll('g.sub._1 circle.dot').call(winTip);
                this.winChart.selectAll('g.sub._1 circle.dot')
                    .on('mouseover.tooltip', (d, i) => {
                        winTip.show(d, i);
                        const pieData = [
                            { value: this._calculateWinPercentage(i.data.value), label: 'Won' },
                            { value: this._calculateLossPercentage(i.data.value), label: 'Lost' }
                        ];
                        simplePie('#tip-pie', pieData).render();
                    })
                    .on('mouseout.tooltip', winTip.hide);

                this.lossChart.selectAll('g.sub._2 circle.dot').call(winTip);
                this.lossChart.selectAll('g.sub._2 circle.dot')
                    .on('mouseover.tooltip', (d, i) => {
                        winTip.show(d, i);
                        const pieData = [
                            { value: this._calculateWinPercentage(i.data.value), label: 'Won' },
                            { value: this._calculateLossPercentage(i.data.value), label: 'Lost' }
                        ];
                        simplePie('#tip-pie', pieData).render();
                    })
                    .on('mouseout.tooltip', winTip.hide);

                // this.bankChart.selectAll('g.sub._0 circle.dot').call(bankTip);
                // this.bankChart.selectAll('g.sub._0 circle.dot')
                //     .on('mouseover.tooltip', bankTip.show)
                //     .on('mouseout.tooltip', bankTip.hide);
            });

        this.chart.render();
    }
}
