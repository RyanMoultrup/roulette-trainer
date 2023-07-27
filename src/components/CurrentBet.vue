<template>
  <div class="flex-0">
    <span>Current Bet</span> $<span id="current-bet">{{ currentBet }}</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tween } from "@/lib/Tween";

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
    }
  },
  watch: {
    currentBetTotal (newVal, oldVal) {
      tween('#current-bet')
          .initValue(oldVal)
          .onRender(val => this.currentBet = val)
          .render(newVal);
    }
  },
}
</script>