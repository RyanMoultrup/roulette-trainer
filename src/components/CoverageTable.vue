<template>
    <div id="coverage-table" class="relative grid grid-rows-3 grid-cols-13 font-roulette w-full h-full" style=" height: 90px">
      <div v-for="spot in table" :class="spot.class" class="text-xs p-1 font-inter font-bold borders">{{ formatter.number(spot.text) }}</div>
    </div>
</template>
<script>
import { computed } from "vue"
import { useStore } from "vuex"
import formatter from "@/lib/formatter"
import { insideTable } from "@/lib/table/table"

export default {
  setup () {
    const store = useStore()

    const payouts = computed(() => store.getters['strategy/getHighestPayouts'])
    const totalBet = computed(() => store.getters['strategy/getCurrentBetTotal'])

    const keyedPayouts = computed(() => {
      return payouts.value.reduce((r, p) => {
        r[p.spot] = p.profit
        return r
      }, {})
    })

    const getPayout = spot => {
      if (keyedPayouts.value[spot] || keyedPayouts.value[spot] === 0) {
        return keyedPayouts.value[spot];
      } else {
        return totalBet.value * -1;
      }
    }

    // Make a deep copy of insideTable, or it will affect the main table
    const table = computed(() => {
      return [...insideTable].map(({...cell}) => {
        const payout = getPayout(cell.text);
        cell.class += payout > 0 ? ' winner borders' : ' loser borders';
        cell.text = payout;
        return cell;
      });
    });

    return {
      formatter,
      table
    }
  }
}

</script>

<style scoped>
.loser {
  @apply text-accent-450
}

.winner {
  @apply text-green-100
}

#coverage-table .red-cell {
  @apply bg-accent-375
}

#coverage-table .black-cell {
  @apply bg-black
}

.borders {
  @apply border-t border border-b border-r border-l border-b
}
</style>