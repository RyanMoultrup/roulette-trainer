<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-accent-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="resetGame()"
  >
    <font-awesome-icon icon="fa-solid fa-plus" class="mr-1" />
    New Game
  </button>
</template>
<script>
import { redrawAll } from "dc";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions('strategy', { resetStrategy: 'reset' }),
    ...mapActions('bank', { bankReset: 'reset' }),
    ...mapActions('simulation', { resetSimulation: 'reset' }),
    resetGame () {
      this.resetStrategy();
      this.bankReset();
      this.resetSimulation();
      redrawAll();
    }
  }
}
</script>