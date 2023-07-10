<template>
  <div class="slider-panel h-full absolute top-0 right-0 bg-green-700 bg-gradient-to-tr from-green-600 via-green-700 to-green-700 z-10 w-1/4">
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

        <div class="mb-6 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Inside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed.</p>
          </div>
          <input type="number" id="bank" class="input shrink-0 w-40" v-model="bank" >
        </div>

        <div class="mb-10 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Inside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="mb-6 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Outside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed.</p>
          </div>
          <input type="number" id="bank" class="input shrink w-40" v-model="bank" >
        </div>

        <div class="mb-6 flex flex-row">
          <div class="basis-full pr-5">
            <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Outside Bet</span>
            <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed.</p>
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