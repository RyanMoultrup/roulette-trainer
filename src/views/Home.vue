<template>
  <div class="layout-container-home flex-1 text-gray-400 py-4 pl-4">
    <div class="side-pane flex flex-col gap-4 p-4">
      <div class="flex gap-3">
        <div class="w-full p-4" style="background-color: #558280; height: 150px;">Something</div>
        <div class="w-full p-4" style="background-color: #331A22; height: 150px;">Else</div>
      </div>
      <h5 class="font-lobster text-xl">Some Heading</h5>
      <div class="p-4 rounded-md" style="background-color: #0C4F4C; height: 100px;">More text describing things</div>
      <div class="p-4 rounded-md" style="background-color: #0C4F4C; height: 100px;">More text describing things</div>
      <h5 class="font-lobster text-xl">More Things</h5>
      <div class="p-4 rounded-md" style="background-color: #0D5C58; height: 100px;">More text describing things</div>
    </div>

    <div class="top-left">
      <div class="flex flex-row justify-between h-full gap-4">
        <base-card>
          <div class="">
            Add some content
          </div>
        </base-card>
        <base-card>
          <div class="">
            <h3 class="font-lobster text-gray-400 text-3xl">Play Roulette</h3>
            <div class="image"></div>
          </div>
        </base-card>
      </div>
    </div>

    <div class="bottom-left">
      <base-card>
        <div class="font-lobster text-3xl">
          <font-awesome-icon icon="fa-solid fa-trophy" /> My Games
        </div>
        <div>
          <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr] justify-between border-b border-b-accent-200 pb-1 text-lg">
            <span>Played On</span>
            <span>Rounds</span>
            <span>Starting Balance</span>
            <span>Profit</span>
            <span>View Game</span>
          </div>
          <div>
            <div v-for="game in games">
              <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr] justify-between">
                <span class="py-2 border-b border-b-accent-100">{{ formatter.dateTime(game.createdAt) }}</span>
                <span class="py-2 border-b border-b-accent-100">{{ game.outcomes.length }}</span>
                <span class="py-2 border-b border-b-accent-100">$1,000</span>
                <span class="py-2 border-b border-b-accent-100">$1,200</span>
                <span @click="viewGame(game._id)" class="py-2 border-b border-b-accent-100 cursor-pointer text-accent-100"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
              </div>
            </div>
          </div>
        </div>
      </base-card>
    </div>

  </div>
</template>
<script>
import { ref, onUnmounted, computed } from "vue"
import { game } from "@/api"
import BaseCard from "@/components/ui/Base/BaseCard.vue"
import { getUserIdFromToken } from "@/lib/storage/auth/TokenStorage";
import formatter from "@/lib/formatter";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: 'App',
  components: {
    BaseCard
  },
  setup () {
    const userId = getUserIdFromToken()
    const games = ref([])
    const store = useStore()
    const router = useRouter()
    // const user = reactive({})

    const user = computed(() => store.getters['user/getUser'])

    game.list(userId).then(async response => {
      console.log('games response::', response.data.data)
      games.value = response.data.data
    })

    const viewGame = gameId => {
      router.push({ path: `/game/${gameId}` })
    }

    return { games, formatter, user, viewGame }
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