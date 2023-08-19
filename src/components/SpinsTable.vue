<!-- Secondary column (hidden on smaller screens) -->
<template>
  <aside :class="gridClass" class="bg-green-800 border-t border-green-800 hidden text-gray-400 lg:block lg:flex-shrink-0 lg:order-last flex flex-col h-full overflow-hidden">

      <div class="grid grid-cols-[1fr,1fr,1fr] top-0 left-0 w-full px-2 pt-2 border-b border-b-accent-200">
        <span>Round</span>
        <span>Bet</span>
        <span>Outcome</span>
      </div>
      <div class="relative px-2 pb-2 pt-1 overflow-y-auto border-t border-t-accent-200 h-full">
        <div v-for="outcome in outcomes" :key="outcome.value.round" class="border-b border-b-green-600">
          <div class="grid grid-cols-[1fr,1fr,1fr] justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-6 w-6 ">
                <span :class="getHitCss(outcome)" class="h-6 w-6 rounded-full text-white text-center inline-block">{{ getHit(outcome) }}</span>
              </div>
              <div class="ml-2">
                <div class="font-medium font-lobster text-xl">
                  Spin {{ outcome.key }}
                </div>
              </div>
            </div>

            <div class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-100"><strong>Bet</strong> {{ formatter.money(outcome.value.betAmt) }}</div>
              <div class="text-xs text-gray-300">{{ outcome.value.betCount }} bets</div>
            </div>

            <div class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-white">
                <base-pill>Won</base-pill> {{ formatter.money(outcome.value.won) }}
              </div>
              <div class="text-sm text-gray-200">
                <base-pill>Lost</base-pill> {{ formatter.money(outcome.value.loss) }}
              </div>
            </div>
          </div>
        </div>
      </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import spots from '../lib/table/spots';
import formatter from "@/lib/formatter";
import { spinHistoryTable } from '@/lib/charts/SpinHistoryTable';
import { removeEmptyBins, spinTable } from '@/lib/Reducers';
import BasePill from "@/components/ui/Base/BasePill.vue";
import { useGridProps } from "@/composables/useGridProp";

/**
 * Callback function that will find empty bins in crossfilter
 * after filters have been applied. Each crossfilter row is
 * passed into the function (d) where we check if the values
 * are empty or not. If they empty they are removed
 * from the data set.
 */
const spinTableEmptyBinCallback = d => {
  return !(
      +d.value.won === 0 &&
      +d.value.loss === 0);
}

export default {
  components: {BasePill},
  setup () {
    return { formatter }
  },
  props: {
    ...useGridProps()
  },
  data () {
    return {
      outcomes: []
    }
  },
  computed: {
    /**
     * Returns instance of crossfilter
     */
    ...mapGetters('simulation', ['getOutcomes']),
  },
  methods: {
    getHit (outcome) {
      return outcome.value.hit !== 37 ? outcome.value.hit : 0;
    },
    getHitCss (outcome) {
      const color = spots[outcome.value.hit].color;
      return {
        'bg-red-700': color === 'red',
        'bg-black': color === 'black',
        'bg-green-400': color === 'green'
      }
    },
    redraw () {
      this.outcomes = removeEmptyBins(spinTableEmptyBinCallback, spinTable(this.getOutcomes)).all();
    },
    initOutcomes () {
      this.outcomes = spinTable(this.getOutcomes).top(Infinity);
    },
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
