<template>
  <div class="flex-0">
    <span>Current Bet</span> <span id="current-bet">{{ formatter.money(currentBet) }}</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tween } from "@/lib/Tween";
import formatter from "@/lib/formatter";

export default {
  data () {
    return {
      currentBet: 0,
    }
  },
  computed: {
    ...mapGetters('strategy', ['getStrategy']),
    currentBetTotal () {
      let bets = this.getStrategy;
      if (bets.length) return bets.reduce((accumulator, item) => accumulator + +item.get(), 0);
      return 0;
    },
    formatter () {
      return formatter;
    }
  },
  watch: {
    currentBetTotal (newVal, oldVal) {
      this.currentBet = newVal
      // tween('#current-bet')
      //     .initValue(oldVal)
      //     .onRender(val => this.currentBet = val)
      //     .render(newVal);
    }
  },
}
</script>