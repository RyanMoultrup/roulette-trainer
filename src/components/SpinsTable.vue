<!-- Secondary column (hidden on smaller screens) -->
<template>
  <aside class="spin-table hidden flex-shrink-0 overflow-x-auto lg:block lg:flex-shrink-0 lg:order-last">
    <div class="relative flex flex-col w-full border-l border-gray-200">
      <div class="">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden border-b border-gray-200">
                <table class="min-w-full divide-y divide-gray-200" style="background-color: #165C32">
                  <thead class="bg-gray-50">
                  <tr style="background-color: #165C32">
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Round
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bets
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outcome
                    </th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200" style="background-color: #165C32">
                  <tr v-for="outcome in outcomes" :key="outcome.value.round" >
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span :class="getHitCss(outcome)" class="h-6 w-6 rounded-full text-white text-center inline-block">{{ getHit(outcome) }}</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Spin {{ outcome.key }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Bet ${{ outcome.value.betAmt }}</div>
                      <div class="text-xs text-gray-500">{{ outcome.value.betCount }} bets</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-white">
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Won
                        </span> ${{ outcome.value.won }}
                      </div>
                      <div class="text-sm text-gray-200">
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Lost
                        </span> ${{ outcome.value.loss }}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
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
import { spinHistoryTable } from '../lib/charts/SpinHistoryTable';
import { removeEmptyBins, spinTable } from '../lib/Reducers';

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
        'bg-green-700': color === 'green'
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
