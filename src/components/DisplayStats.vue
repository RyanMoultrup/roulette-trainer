<template>
  <section class="flex-shrink-0">
    <dl class="grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x">
      <div>
        <div class="px-4 py-4 sm:p-6">
          <dt class="text-base font-normal text-gray-900">
            Total Amount Lost
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-green-900">
              <div >
                <span id="loss">${{ loss }}</span>
<!--                <span id="loss">$0</span>-->
              </div>
            </div>

            <div
                class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
              <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                   fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Increased by</span>
              12%
            </div>
          </dd>
        </div>
      </div>

      <div>
        <div class="px-4 py-4 sm:p-6">
          <dt class="text-base font-normal text-gray-900">
            Total Amount Won
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-green-900">
              <div id="won"><span>${{ won }}</span></div>
            </div>
            <div
                class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
              <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                   fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Increased by</span>
              2.02%
            </div>
          </dd>
        </div>
      </div>

      <div>
        <div class="px-4 py-4 sm:p-6">
          <dt class="text-base font-normal text-gray-900">
            Bank
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-green-900">
              <div id="bank"><span>${{ availableBalance }}</span></div>
            </div>

            <div
                class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
              <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                   fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Increased by</span>
              2.02%
            </div>
          </dd>
        </div>
      </div>

      <div>
        <div class="px-4 py-4 sm:p-6">
          <dt class="text-base font-normal text-gray-900">
            Current Winnings
          </dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-red-900">
              <div id="winnings"><span>${{ currentWinnings }}</span></div>
            </div>

            <div
                class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
              <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                   fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Decreased by </span>
              4.05%
            </div>
          </dd>
        </div>
      </div>
    </dl>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { nextTick } from "vue";
import * as d3 from 'd3';
import { spinHistoryTable } from "../lib/charts/SpinHistoryTable";

export default {
  name: 'Display Stats',
  data () {
    return {
      won: 0,
      loss: 0,
      currentWinnings: 0,
      wonLoss: {
        won: 0,
        loss: 0
      }
    }
  },
  computed: {
    ...mapGetters('bank', ['availableBalance']),
    ...mapGetters('simulation', ['getOutcomes']),
  },
  methods: {
    redraw () {
      const displayFacts = this.getOutcomes.groupAll();
      const reducer = {
        add (i, d) {
          i.loss += +d.loss;
          i.won += +d.won;

          return i;
        },
        remove (i, d) {
          i.loss -= +d.loss;
          i.won -= +d.won;

          return i;
        },
        init () {
          return {
            won: 0,
            loss: 0
          }
        }
      }

      displayFacts.reduce(reducer.add, reducer.remove, reducer.init);
      this.updateStats(displayFacts.value());
      // this.wonLoss = displayFacts.value();
    },
    initOutcomes () {
      const displayFacts = this.getOutcomes.groupAll();
      const reducer = {
        add (i, d) {
          i.loss += +d.loss;
          i.won += +d.loss;

          return i;
        },
        remove (i, d) {
          i.loss -= +d.loss;
          i.won -= +d.loss;

          return i;
        },
        init () {
          return {
            won: 0,
            loss: 0
          }
        }
      }

      displayFacts.reduce(reducer.add, reducer.remove, reducer.init);
      this.updateStats(displayFacts.value());
    },
    updateStats (displayData) {
      const transitionSpeed = 1000;
      const currentWinnings = +displayData.won - +displayData.loss;

      const totalLostTween = (newValue) => {
        return () => {
          const i = d3.interpolate(this.loss, newValue);
          return (t) => {
            this.loss = Math.round(i(t));
          };
        };
      };

      const totalWonTween = (newValue) => {
        return () => {
          const i = d3.interpolate(this.won, newValue);
          return (t) => {
            this.won = Math.round(i(t));
          };
        };
      };

      const currentWinningsTween = (newValue) => {
        return () => {
          const i = d3.interpolate(this.currentWinnings, newValue);
          return (t) => {
            this.currentWinnings = Math.round(i(t));
          };
        };
      };

      d3.select('#won')
          .transition()
          .duration(transitionSpeed)
          .tween('text', totalWonTween(displayData.won));

        d3.select('#loss')
            .transition()
            .duration(transitionSpeed)
            .tween('text', totalLostTween(displayData.loss));

      d3.select('#winnings')
          .transition()
          .duration(transitionSpeed)
          .tween('text', currentWinningsTween(currentWinnings));
    }
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'simulation/addOutcome') {
        this.redraw();
      }
    })

    let spinTable = spinHistoryTable();
    spinTable
        .onRedraw(() => {
          this.redraw();
        });
    spinTable.render();

    this.initOutcomes();
  },
}
</script>
