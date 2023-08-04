<template>
  <section class="stats flex flex-col">
<!--    <dl class="grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x">-->
    <div class="flex text-3xl font-normal text-gray-300 font-lobster gap-4">
      <div>
        <font-awesome-icon icon="fa-solid fa-building-columns mr-2" />
        <span class="ml-3">Bank</span>
      </div>
      <span class="text-gray-300">
        <span id="bank"><span>{{ formatter.money(balance) }}</span></span>
      </span>
    </div>

    <div class="text-base text-gray-400  font-inter">
      <span>
        Total Lost:
      </span>
      <span class="text-base">
        <span id="loss">{{ formatter.money(loss) }}</span>
      </span>
    </div>



    <div class="text-base font-normal text-gray-400 font-inter">
      <span>
        Total Won
      </span>
      <span class="text-base text-gray-400">
        <span id="won"><span>{{ formatter.money(won) }}</span></span>
      </span>
    </div>

    <div class="text-base font-normal text-gray-400 font-inter">
      <span>
        Winnings
      </span>
      <span>
        <span id="winnings"><span>{{ formatter.money(currentWinnings) }}</span></span>
      </span>
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
