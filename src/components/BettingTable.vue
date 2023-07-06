<template>
  <div class="betting-area mx-4 mb-4 mt-2 card-bg-border">
    <div class="spin-buttons px-2 py-3 sm:px-6 justify-between">
    <div class="flex gap-1">
      <button
        type="button"
        class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
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
        class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
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
        class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
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

<!--      <button-->
<!--        type="button"-->
<!--        class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"-->
<!--        @click="resetGame()"-->
<!--      >-->
<!--        <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"-->
<!--             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"-->
<!--             aria-hidden="true">-->
<!--          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>-->
<!--          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>-->
<!--        </svg>-->
<!--        New Game-->
<!--      </button>-->
    </div>

  </div>
    <wheel></wheel>
    <board
      :selected-chip="selectedChip"
    />
    <chip-selection-panel @chipSelected="chipSelected" />
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Chip from '@/components/Chip.vue';
import Wheel from '@/components/Wheel.vue';
import Board from '@/components/Board.vue';
import BetsDisplayPanel from '@/components/BetsDisplayPanel.vue';
import ChipSelectionPanel from '@/components/ChipSelectionPanel.vue';
import { useToast } from "vue-toastification";
import spinEmitter from "@/lib/SpinEmitter.js";
import { spin } from '@/lib/table/wheel.js';

export default {
  name: 'BettingTable',
  components: { Wheel, BetsDisplayPanel, ChipSelectionPanel, Board, Chip },
  setup () {
    const toast = useToast();
    return { toast };
  },
  data () {
    return {
      bets: [],
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
    ...mapGetters('simulation', ['isEmitting', 'selectedChip']),
  },
  methods: {
    ...mapGetters('strategy', ['getStrategy']),
    ...mapActions('strategy', ['replayBet']),
    ...mapActions('simulation', ['play']),
    ...mapMutations('simulation', ['updateSpinEmit', 'updateSelectedChip']),
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
      this.updateSelectedChip(chip);
    },
    async replay () {
      const canBet = await this.replayBet();
      if (!canBet) {
        this.toast.error("You don't have enough in the bank to place your bet");
      }
    },
    // resetGame () {
    //   this.resetStrategy();
    //   this.bankReset();
    //   this.resetSimulation();
    //   redrawAll();
    // }
  }
}
</script>
