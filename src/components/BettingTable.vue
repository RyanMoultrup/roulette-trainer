<template>
  <div class="betting-area bg-white shadow p-4" style="background-color: #14532D;">
<!--    <div class="spin-buttons flex flex-row border-b border-gray-800 px-2 py-3 sm:px-6 bg-gray-700 justify-between">-->
    <div class="spin-buttons px-2 py-3 sm:px-6 justify-between">
      <div class="flex gap-1">
        <button
          type="button"
          class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
          @click="spin"
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
          @click="isEmitting ? stopSpinStream() : startSpinStream()"
        >
          <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          {{ isEmitting ? "Stop Emitting" : "Start Emitting" }}
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

        <button
          type="button"
          class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
          @click="resetGame()"
        >
          <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          New Game
        </button>
      </div>

<!--      <chip-->
<!--          size="md"-->
<!--          :color="selectedChip.color"-->
<!--          :chipValue="String(selectedChip.value)"-->
<!--          :emitSelection="false"-->
<!--      ></chip>-->

<!--      <div>-->
<!--        <span class="text-white" id="rounds">Spins <span>{{ rounds }}</span></span>-->
<!--        &nbsp;-->
<!--        <span class="text-white justify-self-end" id="current-bet">-->
<!--          Current Bet Total: $<span>{{ currentBetTotal }}</span>-->
<!--        </span>-->
<!--      </div>-->
    </div>
<!--    <div id="table-wheel" class="flex bg-green-900 h-full justify-between relative overflow-hidden">-->
      <wheel></wheel>

      <board
        :selected-chip="selectedChip"
      />

      <chip-selection-panel @chipSelected="chipSelected" />
<!--    </div>-->
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Chip from '@/components/Chip.vue';
import Wheel from '@/components/Wheel.vue';
import Board from '@/components/Board.vue';
import BetsDisplayPanel from '@/components/BetsDisplayPanel.vue';
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue';
import { redrawAll } from "dc";
import { useToast } from "vue-toastification";
import spinEmitter from "@/lib/SpinEmitter.js";
import { spin } from '@/lib/table/wheel.js';

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board, Chip },
  emits: [
    'runSimulation',
    'startSpinStream',
    'stopSpinStream',
    'roundsSelected'
  ],
  setup () {
    const toast = useToast();
    return { toast };
  },
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
    ...mapGetters('simulation', ['isEmitting']),
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
    ...mapActions('strategy', { replayBet: 'replayBet', resetStrategy: 'reset' }),
    ...mapActions('bank', { bankReset: 'reset' }),
    ...mapActions('simulation', { resetSimulation: 'reset', play: 'play' }),
    ...mapMutations('simulation', ['updateSpinEmit']),
    roundsSelected (value) {
      this.rounds = value;
    },
    startSpinStream () {
      this.updateSpinEmit(true);
      spinEmitter.start(1);
    },
    stopSpinStream () {
      this.updateSpinEmit(false);
      spinEmitter.stop();
    },
    spin () {
      this.play(spin());
    },
    chipSelected (chip) {
      this.selectedChip = chip;
    },
    async replay () {
      const canBet = await this.replayBet();
      if (!canBet) {
        this.toast.error("You don't have enough in the bank to place your bet");
      }
    },
    resetGame () {
      this.resetStrategy();
      this.bankReset();
      this.resetSimulation();
      redrawAll();
    }
  }
}
</script>
