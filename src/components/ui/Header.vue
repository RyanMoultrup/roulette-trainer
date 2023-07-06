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
          <a href="#" class="text-sm font-medium text-gray-200"><font-awesome-icon icon="fa-solid fa-gear"></font-awesome-icon></a>
        </nav>
      </div>
    </div>

    <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
    <div class="fixed inset-0 z-40 md:hidden">
      <transition enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition-opacity ease-linear duration-300" leave-class="opacity-100"
                  leave-to-class="opacity-0">
        <div class="hidden sm:block sm:fixed sm:inset-0 md:hidden" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      </transition>


      <transition enter-active-class="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                  enter-class="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                  enter-to-class="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave-active-class="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                  leave-class="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave-to-class="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100">
        <nav
            class="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg md:hidden"
            aria-label="Global">
          <div class="h-16 flex items-center justify-between px-4 sm:px-6">
            <a href="#">
              <img class="block h-8 w-auto"
                   src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&amp;shade=500"
                   alt="Workflow">
            </a>
            <button type="button"
                    class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
            <div class="relative text-gray-400 focus-within:text-gray-500">
              <label for="search" class="sr-only">Search all inboxes</label>
              <input id="search" type="search" placeholder="Search all inboxes"
                     class="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600">
              <div class="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="max-w-8xl mx-auto py-3 px-2 sm:px-4">

            <a href="#"
               class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Inboxes</a>

            <a href="#"
               class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">Technical
              Support</a>

            <a href="#"
               class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">Sales</a>

            <a href="#"
               class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">General</a>


            <a href="#"
               class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Reporting</a>


            <a href="#"
               class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">Settings</a>


          </div>
          <div class="border-t border-gray-200 pt-4 pb-3">
            <div class="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full"
                     src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                     alt="">
              </div>
              <div class="ml-3 min-w-0 flex-1">
                <div class="text-base font-medium text-gray-800 truncate">Whitney Francis</div>
                <div class="text-sm font-medium text-gray-500 truncate">whitneyfrancis@example.com
                </div>
              </div>
              <a href="#"
                 class="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">View notifications</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </a>
            </div>
            <div class="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">

              <a href="#"
                 class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">Your
                Profile</a>

              <a href="#"
                 class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">Sign
                out</a>

            </div>
          </div>
        </nav>
      </transition>

    </div>
  </header>
</template>
<script>
import NewGameButton from "@/components/NewGameButton.vue";

export default {
  name: 'App',
  components: { NewGameButton },
}
</script>