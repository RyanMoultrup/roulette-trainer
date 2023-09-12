<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-200 bg-green-650 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="undoBet"
  >
    <font-awesome-icon icon="fa-solid fa-rotate-left" class="mr-2" />
    Undo Bet
  </button>
</template>
<script>
import {mapActions, useStore} from "vuex"
import { game } from "@/api"
import { useRouter } from "vue-router";

export default {
  setup () {
    const store = useStore()

    const undoBet = async () => {
      await store.dispatch('strategy/undoLastBet')
    }

    return { undoBet }
  }
}
</script>