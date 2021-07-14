<template>
  <div id="bets-container" class="flex-grow overflow-y-auto">
    <div class="bg-white bg-opacity-10 shadow overflow-y-auto flex-1">
      <ul class="divide-y divide-green-900">

        <li v-for="(bet, index) in bets" :key="bet.betType()" class="group">
          <a href="#" class="block hover:bg-white hover:bg-opacity-5 relative">
            <span @click="removeBet($event, index)" class="group-hover:opacity-100 opacity-0 absolute cursor-pointer w-4 h-4 pb-1 text-xs text-center rounded-full bg-white bg-opacity-30 right-1 top-1 text-white">x</span>
            <div class="px-3 py-4 ">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-white truncate">
                  {{ bet.name() }}
                </p>
                <div class="flex">


                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-red-800">
                      <chip
                          class="mr-1 border border-solid"
                          size="xs"
                          :chipValue="bet.chip.value"
                          :color="bet.chip.color"
                          :class="bet.chip.color === 'black' ? `border-${bet.chip.color}` : `border-${bet.chip.color}-500`"
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
                    class="bet-spot-img pt-0.5 w-5 h-5 mb-1 text-xs text-center text-white rounded-full"
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
import Chip from '@/components/Chip';

export default {
  props: {
    bets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: { Chip },
  methods: {
    removeBet (event, index) {
      this.$emit('betRemoved', index);
    }
  }
}
</script>