<template>
    <div id="coverage-table" class="relative grid grid-rows-3 grid-cols-13 font-roulette w-full" style=" height: 90px">
      <div v-for="spot in table" :class="spot.class" class="text-xs p-1 font-inter font-bold borders">{{ formatter.number(spot.text) }}</div>
    </div>
</template>
<script>
import { insideTable } from "@/lib/table/table"
import formatter from "@/lib/formatter"
import { computed } from "vue"

export default {
  props: {
    payouts: {
      type: Array,
      default: []
    },
    totalBet: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const keyedPayouts = computed(() => {
      return props.payouts.reduce((r, p) => {
        r[p.spot] = p.profit
        return r
      }, {})
    })

    const getPayout = spot => {
      if (keyedPayouts.value[spot] || keyedPayouts.value[spot] === 0) {
        return keyedPayouts.value[spot];
      } else {
        return props.totalBet * -1;
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

.borders {
  @apply border-t border border-b border-r border-l border-b
}
</style>