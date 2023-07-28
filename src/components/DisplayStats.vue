<template>
  <section class="stats bg-green-600 border border-green-500 m-4 rounded">
<!--    <dl class="grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x">-->
      <div class="total-lost">
        <div class="px-4 py-4 border-l border-l-green-500 border-r border-r-green-800 bg-gradient-to-r from-green-600 via-green-700 to-green-700 sm:p-6">
          <div class="text-3xl text-gray-300  font-lobster">
            <span>
              Total Lost:
            </span>
            <span class="text-4xl font-semibold">
              <span id="loss">{{ formatter.money(loss) }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="total-won">
        <div class="px-4 py-4 border-l border-l-green-500 border-r border-r-green-800  bg-gradient-to-r from-green-600 via-green-700 to-green-700 sm:p-6">
          <div class="text-3xl font-normal text-gray-300 font-lobster">
            <span>
              Total Won
            </span>
            <span class="text-4xl font-semibold text-gray-300">
              <span id="won"><span>{{ formatter.money(won) }}</span></span>
            </span>
          </div>
        </div>
      </div>

      <div class="bank-display">
        <div class="px-4 py-4 border-r border-green-800 sm:p-6 bg-gradient-to-r from-green-600 via-green-700 to-green-700">
          <div class="text-3xl font-normal text-gray-300 font-lobster">
            <font-awesome-icon icon="fa-solid fa-building-columns" />
            <span>
              Bank
            </span>
            <span class="text-4xl font-semibold text-gray-300">
              <span id="bank"><span>{{ formatter.money(balance) }}</span></span>
            </span>
          </div>
        </div>
      </div>

      <div class="current-winnings">
        <div class="px-4 py-4 border-l border-l-green-500  bg-gradient-to-r from-green-600 via-green-700 to-green-700 sm:p-6">
          <div class="text-3xl font-normal text-gray-300 font-lobster">
            <span>
              Winnings
            </span>
            <span class="text-4xl font-semibold text-gray-300">
              <span id="winnings"><span>{{ formatter.money(currentWinnings) }}</span></span>
            </span>
          </div>
        </div>
      </div>
<!--    </dl>-->
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { tween } from '@/lib/Tween.js';
import { displayReduce } from '@/lib/Reducers';
import { spinHistoryTable } from '@/lib/charts/SpinHistoryTable';
import formatter from "@/lib/formatter";

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
    formatter () {
      return formatter;
    },
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
