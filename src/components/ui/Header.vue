<template>
  <header class="flex-shrink-0 relative h-16 flex items-center bg-green-800 border-b border-green-700">
    <!-- Logo area -->
    <div class="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
      <a href="#"
         class="flex items-center justify-center h-16 w-16 bg-green-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 md:w-20">
        <img class="h-14 w-auto" src="@/assets/american-roulette.png"
             alt="Workflow">
      </a>
    </div>

    <!-- Desktop nav area -->
    <div class="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1 ml-4">
        <new-game-button />
      </div>
      <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10 text-gray-200">
        <nav aria-label="Global" class="flex space-x-10">
          <a href="#" @click="showSettings" class="text-2xl font-medium"><font-awesome-icon icon="fa-solid fa-gear"></font-awesome-icon></a>
        </nav>
        <span>{{ username }}</span>
        <span><router-link to="logout">Logout</router-link></span>
      </div>
    </div>
  </header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import DisplayStats from "@/components/DisplayStats.vue"
import NewGameButton from "@/components/NewGameButton.vue"

export default {
  name: 'App',
  components: { NewGameButton, DisplayStats },
  setup () {
    const store = useStore()
    const username = computed(() => {
      return store.getters['user/getUsername']
    })

    return { username }
  },
  methods: {
    showSettings () {
      this.$emit('show')
    }
  }
}
</script>