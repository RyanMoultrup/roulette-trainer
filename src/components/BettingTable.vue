<template>
  <section class="w-full" style="height: 25%">
    <div class="bg-white overflow-hidden shadow" style="height: 400px;">
      <div class="flex flex-row border-b border-gray-800 px-2 py-3 sm:px-6 bg-gray-700 justify-between">
        <div class="flex gap-1">
          <button
            type="button"
            class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
            @click="runSimulation"
          >
            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Spin
          </button>

          <button
            type="button"
            class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
            @click="emittingSpins ? stopSpinStream() : startSpinStream()"
          >
            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            {{ emittingSpins ? "Stop Emitting" : "Start Emitting" }}
          </button>

          <button
            type="button"
            class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
            @click="replay()"
          >
            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Last Bet
          </button>

<!--          <button type="button"-->
<!--                  class="reset-game inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">-->
<!--            <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"-->
<!--                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"-->
<!--                 aria-hidden="true">-->
<!--              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>-->
<!--              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>-->
<!--            </svg>-->
<!--            Reset-->
<!--          </button>-->
        </div>

        <chip
            size="md"
            :color="selectedChip.color"
            :chipValue="String(selectedChip.value)"
            :emitSelection="false"
        ></chip>

        <div>
          <select name="num-rounds" id="num-rounds" @change="roundsSelected($event)" v-model="rounds">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>

          &nbsp;
          <span class="text-white" id="rounds">Spins <span>{{ rounds }}</span></span>
          &nbsp;
          <span class="text-white justify-self-end" id="current-bet">
            Current Bet Total: $<span>{{ currentBetTotal }}</span>
          </span>
        </div>

      </div>
      <div id="table-wheel" class="flex bg-green-900 h-full justify-between relative overflow-hidden">
        <wheel></wheel>

        <board
          :selected-chip="selectedChip"
          :bets="bets"
        />

        <bets-display-panel
          :bets="bets"
        />

        <chip-selection-panel @chipSelected="chipSelected" />
      </div>
    </div>

  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Chip from '@/components/Chip.vue';
import Wheel from '@/components/Wheel.vue';
import Board from '@/components/Board.vue';
import BetsDisplayPanel from '@/components/BetsDisplayPanel.vue';
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue';

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board, Chip },
  emits: [
    'runSimulation',
    'startSpinStream',
    'stopSpinStream',
    'roundsSelected'
  ],
  data () {
    return {
      bets: [],
      selectedChip: {
        color: 'red',
        value: '5'
      },
      rounds: 0,
      emittingSpins: false
    }
  },
  watch: {
    '$store.state.simulation.rounds': function (val) {
      this.rounds = val;
    }
  },
  computed: {
    currentBetTotal () {
      let bets = this.getStrategy();
      if (bets.length) {
        return bets.reduce((accumulator, item) => {
          return accumulator + +item.get();
        }, 0);
      }
      return 0;
    }
  },
  methods: {
    ...mapGetters('strategy', ['getStrategy']),
    ...mapActions('strategy', ['replayBet']),
    runSimulation () {
      this.$emit('runSimulation');
    },
    startSpinStream () {
      this.emittingSpins = true;
      this.$emit('startSpinStream');
    },
    stopSpinStream () {
      this.$emit('stopSpinStream');
      this.emittingSpins = false;
    },
    chipSelected (chip) {
      this.selectedChip = chip;
    },
    roundsSelected (event) {
      this.$emit('roundsSelected', +event.target.value);
    },
    replay () {
      if (!this.replayBet()) {
        console.log('Cannot place more bets');
      }
    }
  }
}
</script>
