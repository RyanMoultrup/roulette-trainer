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

    <!-- Menu button area -->
    <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
      <!-- Mobile menu button -->
      <button type="button"
              class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Desktop nav area -->
    <div class="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1 ml-4">
        <new-game-button />
      </div>
      <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
        <nav aria-label="Global" class="flex space-x-10">
          <a href="#" @click="showSettings" class="text-2xl font-medium text-gray-200"><font-awesome-icon icon="fa-solid fa-gear"></font-awesome-icon></a>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
import NewGameButton from "@/components/NewGameButton.vue";

export default {
  name: 'App',
  components: { NewGameButton },
  methods: {
    showSettings () {
      this.$emit('show');
    }
  }
}
</script>