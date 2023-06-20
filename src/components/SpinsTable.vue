<!-- Secondary column (hidden on smaller screens) -->
<template>
  <aside class="hidden flex-shrink-0 overflow-x-auto lg:block lg:flex-shrink-0 lg:order-last">
    <div class="relative flex flex-col w-full border-l border-gray-200 bg-gray-100">
      <div class="">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden border-b border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                  <tr>
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
                  <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="outcome in outcomes()" :key="outcome.value.round" >
                    <td class="px-2 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 ">
                          <span class="h-6 w-6 rounded-full bg-red-700 p-1 text-white">{{ outcome.value.hit }}</span>
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
                      <div class="text-sm text-gray-900">
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Won
                        </span> ${{ outcome.value.won }}
                      </div>
                      <div class="text-sm text-gray-500">
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

export default {
  methods: {
    ...mapGetters('simulation', ['getOutcomes']),
    outcomes () {
      let values = this.getOutcomes()
          .get()
          .dimension(d => d.round)
          .group()
          .reduce(
              (i, d) => {
                i.hit = d.hit;

                if (d.wonRound) {
                  i.won += +d.won;
                  i.loss += 0;
                }

                if (d.lostRound) {
                  i.won += 0;
                  i.loss += +d.bet;
                }

                i.betCount++;
                i.betAmt += +d.bet;
                return i;
              },
              (i, d) => {
                i.round = d.round;

                if (d.wonRound) {
                  i.won -= +d.won;
                  i.loss -= 0;
                }

                if (d.lostRound) {
                  i.won -= 0;
                  i.loss -= d.bet;
                }

                i.betCount--;
                i.betAmt -= +d.bet;

                return i
              },
              () => {
                return {
                  round: 0,
                  won: 0,
                  loss: 0,
                  betCount: 0,
                  betAmt: 0,
                  hit: 0,
                }
              }
          ).top(Infinity);
      return values;
    }
  }
}
</script>