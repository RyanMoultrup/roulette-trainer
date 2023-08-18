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
              <div class="flex gap-1 items-center">
                <font-awesome-icon icon="fa-solid fa-medal" />
                <span class="font-lobster text-xl text-gray-400">Achievements</span>
              </div>
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
            <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr] content-center justify-between border-b border-b-accent-200 pb-1 text-lg text-gray-300">
              <span v-for="column in columns">
                {{ column.title }}
                <font-awesome-icon @click="sortColumn(column.key, column.state)" class="text-accent-100 cursor-pointer" :icon="`fa-solid ${sortStateIcons[column.state]}`" />
              </span>
              <span>View Game</span>
            </div>
            <div>
              <div v-for="game in paginatedGames" class="row">
                <div class="grid grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr] items-center justify-between">
                  <span class="col">{{ formatter.dateTime(game.createdAt) }}</span>
                  <span class="col">{{ game.rounds }}</span>
                  <span class="col">{{ game.bets }}</span>
                  <span class="col">{{ formatter.money(game.startBalance) }}</span>
                  <span class="col">{{ formatter.money(game.profit) }}</span>
                  <span @click="viewGame(game._id)" class="col cursor-pointer text-accent-100"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                </div>
              </div>
            </div>
            <div class="flex gap-3 justify-end py-3">
              <span @click="goToPage(currentPage - 1)">
                <font-awesome-icon class="text-accent-100 text-2xl cursor-pointer" icon="fa-solid fa-circle-chevron-left" />
              </span>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <span @click="goToPage(currentPage + 1)">
                <font-awesome-icon class="text-accent-100 text-2xl cursor-pointer" icon="fa-solid fa-circle-chevron-right" />
              </span>
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
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const user = computed(() => store.getters['user/getUser'])

    game.list(userId).then(async response => {
      games.value = response.data.data.map(g => {
        g.createdAt = new Date(g.createdAt)
        return g
      })
      sortColumnAsc('createdAt')
    })

    const paginatedGames = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return games.value.slice(start, end);
    })

    const totalPages = computed(() => Math.ceil(games.value.length / itemsPerPage.value))

    const goToPage = pageNumber => {
      if (pageNumber > 0 && pageNumber <= totalPages.value) currentPage.value = pageNumber
    }

    const viewGame = gameId => {
      router.push({ path: `/game/${gameId}` })
    }

    const sortStateIcons = {
      ascending: 'fa-arrow-up-wide-short',
      descending: 'fa-arrow-down-short-wide',
      normal: 'fa-arrows-up-down'
    }

    const columns = ref([
      {
        title: 'Played On',
        key: 'createdAt',
        state: 'ascending'
      },
      {
        title: 'Rounds',
        key: 'rounds',
        state: 'normal'
      },
      {
        title: 'Bets Placed',
        key: 'bets',
        state: 'normal'
      },
      {
        title: 'Start Balance',
        key: 'startBalance',
        state: 'normal'
      },
      {
        title: 'Profit',
        key: 'profit',
        state: 'normal'
      },
    ])

    const setColIcons = (key, state) => columns.value.forEach(c => (c.key === key) ? c.state = state : c.state = 'normal')

    const sortColumn = (key, state) => {
      if (state === 'normal') {
        setColIcons(key, 'ascending')
        sortColumnAsc(key)
      }

      if (state === 'ascending') {
        setColIcons(key, 'descending')
        sortColumnDesc(key)
      }

      if (state === 'descending') {
        setColIcons('createdAt', 'ascending')
        sortColumnAsc('createdAt')
      }
    }

    const sortColumnAsc = colName => games.value.sort((a, b) => b[colName] - a[colName])
    const sortColumnDesc = colName => games.value.sort((a, b) => a[colName] - b[colName])

    return {
      games,
      formatter,
      user,
      viewGame,
      router,
      columns,
      sortColumn,
      sortStateIcons,
      totalPages,
      goToPage,
      paginatedGames,
      currentPage
    }
  }
}

</script>

<style scoped>
.col {
  @apply py-2 border-b border-b-accent-150
}

.row:nth-child(2n) {
  background-color: #08291e;
}

.row:hover {
  @apply bg-accent-150
}
</style>