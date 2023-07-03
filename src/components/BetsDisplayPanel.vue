<template>
  <div id="bets-container" class="bet-display flex-grow overflow-x-auto" style="background-color: #14532D;">
    <div class="bg-white bg-opacity-10 shadow flex-1">
      <ul class="divide-y divide-green-900">
        <li v-for="bet in this.getStrategy" :key="bet.betType()" class="group">
          <a href="#" class="block hover:bg-white hover:bg-opacity-5 relative">
            <span @click="remove($event, bet.placement())" class="group-hover:opacity-100 opacity-0 absolute cursor-pointer w-4 h-4 pb-1 text-xs text-center rounded-full bg-white bg-opacity-30 right-1 top-1 text-white">x</span>
            <div class="px-3 py-4 ">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-white truncate">
                  {{ bet.name() }}
                </p>
                <div class="flex">

                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-red-800">
                      <chip
                          v-for="chip in bet.chips" :key="chip.value"
                          class="mr-1 border border-solid"
                          size="xs"
                          :chipValue="chip.value"
                          :color="chip.color"
                          :class="chip.color === 'black' ? `border-${chip.color}` : `border-${chip.color}-500`"
                      ></chip>
                      ${{ bet.get() }}
                    </p>
                    <p class="px-2 py-0.5 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ${{ bet.payout() }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-2 grid grid-cols-9">
                <span
                    v-for="spot in bet.winningSpots()"
                    :key="spot.spot"
                    class="pt-0.5 w-5 h-5 mb-1 text-xs text-center text-white rounded-full"
                    :class="spot.color === 'red' ? 'bg-red-800' : 'bg-black'"
                >
                  {{ spot.spot }}
                </span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: { Chip },
  computed: {
    ...mapGetters('strategy', ['getStrategy'])
  },
  methods: {
    ...mapMutations('strategy', ['removeBet']),
    remove (event, index) {
      this.removeBet(index);
    }
  }
}
</script>
