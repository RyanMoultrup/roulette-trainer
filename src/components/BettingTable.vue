<template>
  <section class="flex-grow-0" style="height: 20%;">
    <!--            <div class="w-full mx-auto">-->
    <div class="bg-white overflow-hidden shadow">
      <div class="flex flex-row border-b border-gray-800 px-2 py-3 sm:px-6 bg-gray-700 justify-between">
        <div>
          <button
            type="button"
            class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            @click="runSimulation"
          >
            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Run Simulation
          </button>

          <button type="button"
                  class="reset-game inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Reset
          </button>
        </div>

        <div>
          <select name="num-rounds" id="num-rounds">
            <option value="1">1</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>


          <span class="text-white " id="rounds">Spins <span>0</span></span>
          <span class="text-white justify-self-end" id="current-bet">Current Bet: $<span>200</span></span>
        </div>

      </div>
      <div id="table-wheel" class="flex bg-green-900 relative right-1/4">
        <wheel></wheel>

        <board @betPlaced="betPlaced"></board>

        <bets-display-panel></bets-display-panel>

        <chip-selection-panel></chip-selection-panel>
      </div>
    </div>
    <!--            </div>-->

  </section>
</template>

<script>

import Wheel from "@/components/Wheel";
import Board from "@/components/Board";
import BetsDisplayPanel from "@/components/BetsDisplayPanel";
import ChipSelectionPanel from "@/components/ChipSelectionPanel";

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board },
  data () {
    return {
      bets: []
    }
  },
  methods: {
    runSimulation () {
      this.$emit('runSimulation', this.bets)
    },
    betPlaced(bet) {
      this.bets.push(bet);
      console.log('The bet:::', bet);
    }
  }
}
</script>
