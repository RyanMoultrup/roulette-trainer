<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-650 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="replay()"
  >
    <font-awesome-icon icon="fa-solid fa-rotate-right" class="mr-1" />
    Last Bet
  </button>
</template>
<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";

export default {
  setup () {
    const toast = useToast();
    return { toast };
  },
  methods: {
    ...mapActions('strategy', ['replayBet']),
    async replay () {
      const canBet = await this.replayBet();
      if (!canBet) {
        this.toast.error("You don't have enough in the bank to place your bet");
      }
    }
  }
}
</script>