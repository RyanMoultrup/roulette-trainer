<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-650 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="doubleBet()"
  >
    <font-awesome-icon icon="fa-solid fa-angles-up" class="mr-1" />
    2x Bet
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
    ...mapActions('strategy', { double: 'doubleBet' }),
    async doubleBet () {
      if (!await this.double()) {
        this.toast.error("You do not have enough in the bank to place your bet");
      }
    }
  }
}
</script>
