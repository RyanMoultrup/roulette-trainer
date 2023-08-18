<template>
  <div class="layout-container-home flex-1 text-gray-400 py-4 pl-4">
    <div class="side-pane flex flex-col gap-4 pr-4">
      <div class="flex gap-3">
        <div class="w-full p-4 flex flex-col gap-4 rounded" style="background-color: #558280;">
          <span class="text-accent-50">Games</span>
          <span class="self-center font-lobster text-6xl text-accent-50">5</span>
        </div>
        <div class="w-full p-4 flex flex-col gap-4 rounded" style="background-color: #331A22;">
          <span class="text-accent-400">Total Won</span>
          <span class="self-center font-lobster text-6xl text-accent-400">{{ formatter.money(33875)}}</span>
        </div>
      </div>
      <h5 class="font-lobster text-xl">Strategies</h5>
      <div class="p-4 rounded-md" style="background-color: #0C4F4C; height: 100px;">Martingale</div>
      <div class="p-4 rounded-md" style="background-color: #0C4F4C; height: 100px;">Peroli</div>
      <h5 class="font-lobster text-xl">More Things</h5>
      <div class="p-4 rounded-md" style="background-color: #0D5C58; height: 100px;">More text describing things</div>
    </div>

    <div class="top-left">
      <div class="flex flex-row justify-between h-full gap-4">
        <base-card :top-full="true">
          <div class="flex flex-col h-full">
            <div class="font-lobster text-3xl">
              Welcome! {{ user.username }}
            </div>
            <span>Rank: <base-pill>Expert</base-pill></span>
            <div class="flex flex-col gap-3 mt-auto">
              <span class="font-lobster text-xl text-gray-400">Achievements</span>
              <div class="flex gap-3">
                <mountain-badge />
                <trophy />
                <money-up />
              </div>
            </div>
          </div>
        </base-card>
        <base-card :top-corner-gradient="true">
          <div class="flex flex-col h-full">
            <h3 class="font-lobster text-gray-400 text-3xl">Play Roulette</h3>
            <button
                @click="router.push({ name: 'play' })"
                type="button"
                class="inline-flex justify-center mt-auto w-full items-center px-3 py-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-200 bg-accent-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700">
              Click Here to Play Roulette!
            </button>
          </div>
        </base-card>
      </div>
    </div>

    <div class="bottom-left">
      <base-card :top-corner-gradient="true">
        <div>
          <div class="font-lobster text-3xl mb-4">
            <font-awesome-icon icon="fa-solid fa-trophy" /> My Games
          </div>
          <div>
            <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr] content-center justify-between border-b border-b-accent-200 pb-1 text-lg">
              <span>Played On</span>
              <span>Rounds</span>
              <span>Bets Placed</span>
              <span>Starting Balance</span>
              <span>Profit</span>
              <span>View Game</span>
            </div>
            <div>
              <div v-for="game in games">
                <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr] items-center justify-between">
                  <span class="py-2 border-b border-b-accent-100">{{ formatter.dateTime(game.createdAt) }}</span>
                  <span class="py-2 border-b border-b-accent-100">{{ game.rounds }}</span>
                  <span class="py-2 border-b border-b-accent-100">{{ game.bets }}</span>
                  <span class="py-2 border-b border-b-accent-100">{{ formatter.money(game.startBalance) }}</span>
                  <span class="py-2 border-b border-b-accent-100">{{ formatter.money(game.profit) }}</span>
                  <span @click="viewGame(game._id)" class="py-2 border-b border-b-accent-100 cursor-pointer text-accent-100"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-card>
    </div>

  </div>
</template>
<script>
import { game } from "@/api"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import formatter from "@/lib/formatter"
import { ref, onUnmounted, computed } from "vue"
import BaseCard from "@/components/ui/Base/BaseCard.vue"
import BasePill from "@/components/ui/Base/BasePill.vue"
import Trophy from "@/components/badges/Trophy.vue"
import MountainBadge from "@/components/badges/MountainBadge.vue"
import { getUserIdFromToken } from "@/lib/storage/auth/TokenStorage"
import MoneyUp from "@/components/badges/MoneyUp.vue";

export default {
  name: 'App',
  components: {
    MoneyUp,
    MountainBadge,
    Trophy,
    BasePill,
    BaseCard
  },
  setup () {
    const userId = getUserIdFromToken()
    const games = ref([])
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.getters['user/getUser'])

    game.list(userId).then(async response => {
      games.value = response.data.data
    })

    const viewGame = gameId => {
      router.push({ path: `/game/${gameId}` })
    }

    return { games, formatter, user, viewGame, router }
  }
}
</script>

<style>
.image {
  background: url("@/assets/play-rated.jpg");
  background-size: cover;
  background-blend-mode: soft-light;
  width: 300px;
  height: 250px;
}
</style>