<template>
  <div class="layout-container-home flex-1 text-gray-400 py-4 pl-4">
    <div class="side-pane flex flex-col gap-4 pr-4">
      <div class="flex gap-3">
        <div class="w-full p-4 flex flex-col gap-4 rounded" style="background-color: #2E4746;">
          <span class="text-accent-50"  style="color: #588785">Games</span>
          <span class="self-center font-lobster text-6xl text-accent-50 text-shadow" style="color: #588785">{{ totalGames }}</span>
        </div>
        <div class="w-full p-4 flex flex-col gap-4 rounded" style="background-color: #1b1003;">
          <span class="text-accent-400" style="color: #572B39">Total Won</span>
          <span class="self-center font-lobster text-6xl text-accent-400 text-shadow" style="color: #572B39">{{ formatter.money(totalWon)}}</span>
        </div>
      </div>
      <h5 class="font-lobster text-xl">Strategies</h5>
      <div class="p-4 rounded flex flex-col justify-between gap-3" style="background-color: #0C4F4C;">
        <span class="font-bold">Flat Bet</span>
        <div class="flex gap-3 text-xs">
          <span>Effectiveness: <base-pill>medium</base-pill></span>
          <span>Risk: <base-pill>low</base-pill></span>
          <span>Reward: <base-pill>low</base-pill></span>
        </div>
        <p class="text-sm">A simple strategy great for beginners</p>
        <button
            type="button"
            @click="showFlatBet"
            class="play inline-flex justify-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-gray-400 bg-accent-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
        >
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mr-1" />
          Learn More
        </button>
      </div>
      <div class="p-4 rounded flex flex-col justify-between gap-3" style="background-color: #0C4F4C;">
        <span class="font-bold">Martingale</span>
        <div class="flex gap-3 text-xs">
          <span>Effectiveness: <base-pill>medium</base-pill></span>
          <span>Risk: <base-pill>high</base-pill></span>
          <span>Reward: <base-pill>medium</base-pill></span>
        </div>
        <p class="text-sm">A simple strategy used to recoup losses quickly</p>
        <button
            type="button"
            @click="showMartingale"
            class="play inline-flex justify-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-gray-400 bg-accent-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
        >
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mr-1" />
          Learn More
        </button>
      </div>
      <div class="p-4 rounded flex flex-col justify-between gap-3" style="background-color: #0C4F4C;">
        <span class="font-bold">Paroli</span>
        <div class="flex gap-3 text-xs">
          <span>Effectiveness: <base-pill>medium</base-pill></span>
          <span>Risk: <base-pill>high</base-pill></span>
          <span>Reward: <base-pill>medium</base-pill></span>
        </div>
        <p class="text-sm">A positive progression strategy that is the opposite of the Martingale strategy</p>
        <button
            type="button"
            @click="showParoli"
            class="play inline-flex justify-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded text-gray-400 bg-accent-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
        >
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mr-1"/>
          Learn More
        </button>
      </div>
<!--      <h5 class="font-lobster text-xl">More Things</h5>-->
<!--      <div class="p-4 rounded" style="background-color: #0D5C58; height: 100px;">More text describing things</div>-->
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
            <div class="max-h-36 overflow-hidden">
              <wheel />
            </div>
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
  <martingale :show="showMartingalePanel" @close="showMartingalePanel = !showMartingalePanel" />
  <paroli :show="showParoliPanel" @close="showParoliPanel = !showParoliPanel" />
  <flat-bet :show="showFlatBetPanel" @close="showFlatBetPanel = !showFlatBetPanel" />
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
import Wheel from "@/components/Wheel.vue";
import Martingale from "@/components/learning/strategies/Martingale.vue";
import Paroli from "@/components/learning/strategies/Paroli.vue";
import FlatBet from "@/components/learning/strategies/FlatBet.vue";

export default {
  name: 'App',
  components: {
    FlatBet,
    Paroli,
    Martingale,
    Wheel,
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
    let totalGames = ref(0)
    let totalWon = ref(0)
    let showMartingalePanel = ref(false)
    let showParoliPanel = ref(false)
    let showFlatBetPanel = ref(false)

    const user = computed(() => store.getters['user/getUser'])

    const showMartingale = () => {
      showMartingalePanel.value = true
    }

    const showParoli = () => {
      showParoliPanel.value = true
    }

    const showFlatBet = () => {
      showFlatBetPanel.value = true
    }

    game.list(userId).then(async response => {
      games.value = response.data.data.map(g => {
        g.createdAt = new Date(g.createdAt)
        return g
      })
      sortColumnAsc('createdAt')
      totalGames.value = games.value.length
      totalWon.value = games.value.reduce((r, g) => r + g.profit, 0)
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
      currentPage,
      totalGames,
      totalWon,
      showMartingale,
      showMartingalePanel,
      showParoliPanel,
      showParoli,
      showFlatBetPanel,
      showFlatBet
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