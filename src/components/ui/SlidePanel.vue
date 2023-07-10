<template>
  <div class="slider-panel h-full absolute top-0 right-0 bg-green-700 bg-gradient-to-tr from-green-600 via-green-700 to-green-700 z-10 w-1/3">
    <div>
      <header class="p-5 bg-green-500 bg-gradient-to-r from-green-500 via-green-500 to-green-600">
        <div>
          <span class="font-lobster text-3xl text-gray-300"><font-awesome-icon icon="fa-solid fa-gear" /> Game Settings</span>
        </div>
      </header>
      <form class="p-5">

        <div class="mb-10 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Bank</span>
            <p class="mt-2 text-gray-300 text-sm">Set the initial bank value for the game.</p>
          </div>
          <input type="number" id="bank" class="input flex-none w-40" v-model="bank" >
        </div>

        <div class="mb-5 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Table Limits</span>
            <p class="mt-2 text-gray-300 text-sm">Turn on to set table limits for the game i.e. max and min bets</p>
          </div>
          <div class="pt-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
            </label>
          </div>
        </div>

        <div class="ml-3 mb-5 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Inside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on inside bets.</p>
          </div>
          <input type="number" id="bank" class="input shrink-0 w-40" v-model="bank" >
        </div>

        <div class="ml-3 mb-10 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Inside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on inside bets.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="ml-3 mb-5 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Outside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on outside bets.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="ml-3 mb-10 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Outside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on outside bets.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="mb-5 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Real Time Simulation</span>
            <p class="mt-2 text-gray-300 text-sm">Turn on to simulate real time play. This setting will simulate real time by setting a time between spins like at a real casino. This will not slow down online game play but instead will calculate how long the spins you take would have taken at a real casino. You can set limits to simulate real casino play.</p>
          </div>
          <div class="pt-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
            </label>
          </div>
        </div>

        <div class="ml-3 mb-5 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Time at Table</span>
            <p class="mt-2 text-gray-300 text-sm">In order to better simulate actual play at a real roulette table this setting lets you place a limit on the amount of time you'd be able to spend at the table. It will calculate the time per spin set below after each spin and not allow you to so any more spins for a particular game.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="ml-3 mb-6 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Time Per Spin</span>
            <p class="mt-2 text-gray-300 text-sm">The amount of time that each spin would take in real life. This will be calculated after each spin and you will not be able to make more spins once the max time has been reached.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

      </form>
    </div>
  </div>
  <div class="bg-black absolute top-0 left-0 opacity-40 z-0 w-full h-full"></div>
</template>

<style>
.slider-panel {
  -webkit-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  -moz-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
}

.input {
  @apply h-10 bg-green-500 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-green-500 dark:border-green-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400
}
</style>
<script>
export default {
  data () {
    return {
      bank: 1000
    }
  }
}
</script>