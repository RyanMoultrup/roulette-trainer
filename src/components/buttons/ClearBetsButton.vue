<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-200 bg-green-650 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="clearBets"
  >
    <font-awesome-icon icon="fa-solid fa-broom" class="mr-2" />
    Clear
  </button>
</template>
<script>
import {mapActions, useStore} from "vuex"
import { game } from "@/api"
import { useRouter } from "vue-router";

export default {
  setup () {
    const store = useStore()

    const clearBets = async () => {
      await store.dispatch('strategy/clearAll')
    }

    return { clearBets }
  }
}
</script>