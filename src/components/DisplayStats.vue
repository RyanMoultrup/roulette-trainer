<template>
  <section class="stats">
<!--    <dl class="grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x">-->
      <div class="total-lost">
        <div class="px-4 py-4 sm:p-6">
          <div class="text-base font-normal text-gray-300">
            Total Lost
          </div>
          <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold" style="color: #abd3ba">
              <div >
                <span id="loss">${{ loss }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="total-won">
        <div class="px-4 py-4 sm:p-6">
          <div class="text-base font-normal text-gray-300">
            Total Won
          </div>
          <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-green-900">
              <div id="won"><span>${{ won }}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bank-display">
        <div class="px-4 py-4 sm:p-6">
          <div class="text-base font-normal text-gray-300">
            Bank
          </div>
          <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div class="flex items-baseline text-2xl font-semibold text-green-900">
              <div id="bank"><span>${{ balance }}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="current-winnings">
        <div class="px-4 py-4 sm:p-6">
          <div class="text-base font-normal text-gray-300">
            Current Winnings
          </div>
          <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
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
          </div>
        </div>
      </div>
<!--    </dl>-->
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { tween } from '@/lib/Tween.js';
import { displayReduce } from '../lib/Reducers';
import { spinHistoryTable } from '../lib/charts/SpinHistoryTable';

export default {
  name: 'Display Stats',
  data () {
    return {
      won: 0,
      loss: 0,
      currentWinnings: 0,
      balance: 0
    }
  },
  computed: {
    ...mapGetters('bank', ['availableBalance']),
    ...mapGetters('simulation', ['getOutcomes']),
  },
  watch: {
    availableBalance (newVal, oldVal) {
      tween('#bank')
          .initValue(oldVal)
          .onRender(val => this.balance = val)
          .render(newVal);
    }
  },
  methods: {
    redraw () {
      const displayFacts = displayReduce(this.getOutcomes);
      const currentWinnings = +displayFacts.won - +displayFacts.loss;

      tween('#won')
          .initValue(this.won)
          .onRender(val => this.won = val)
          .render(displayFacts.won);

      tween('#loss')
          .initValue(this.loss)
          .onRender(val => this.loss = val)
          .render(displayFacts.loss);

      tween('#winnings')
          .initValue(this.currentWinnings)
          .onRender(val => this.currentWinnings = val)
          .render(currentWinnings);
    }
  },
  mounted () {
    this.balance = this.availableBalance;
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

    this.redraw();
  },
}
</script>
