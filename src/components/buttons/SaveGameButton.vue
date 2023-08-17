<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="saveGame"
  >
    <font-awesome-icon icon="fa-regular fa-floppy-disk" class="mr-2" />
    Save Game
  </button>
</template>
<script>
import { useStore } from "vuex"
import { game } from "@/api"
import { useRouter } from "vue-router";

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const saveGame = async () => {
      const outcomes = store.getters['simulation/getOutcomes'].all()
      const settings = store.getters['settings/getBetLimits']
      const userId = store.getters['user/getUser']._id
      const rounds = store.getters['simulation/getRounds']
      const startBalance = store.getters['bank/startBalance']

      const response = await game.create(userId, {
        outcomes,
        user: userId,
        rounds,
        startBalance,
        ...settings
      })

      if (response.status === 200) {
        await router.push({ name: 'home' })
      }
    }

    return { saveGame }
  }
}
</script>