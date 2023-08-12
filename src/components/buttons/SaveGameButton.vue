<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="saveGame"
  >
    <font-awesome-icon icon="fa-solid fa-plus" class="mr-1" />
    Save Game
  </button>
</template>
<script>
import { useStore } from "vuex";
import { game } from "@/api";

export default {
  setup () {
    const store = useStore()
    const saveGame = async () => {
      console.log('SAVING GAME::')
      const outcomes = store.getters['simulation/getOutcomes'].all()
      const settings = store.getters['settings/getBetLimits']
      const userId = store.getters['user/getUser']._id

      console.log('outcomes::', outcomes)
      console.log('userId::', userId)

      const response = await game.create(userId, {
        outcomes,
        user: userId
      })

      console.log('save game response::', response)
    }

    return { saveGame }
  }
}
</script>