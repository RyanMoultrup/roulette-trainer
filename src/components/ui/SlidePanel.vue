<template>
  <div class="fixed top-0 right-0 z-10 h-full max-w-2xl">
    <slide-in-from-right-transition>
      <div v-if="show" class="slider-panel h-full bg-gradient-to-tr from-0% from-accent-150 via-35% via-green-800 to-green-800">
        <div>
          <header class="p-5 bg-green-500 bg-gradient-to-r from-accent-150 via-green-700 to-green-800">
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
                  <input :checked="hasTableLimit" @input="toggleTableLimit" type="checkbox" value="" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                </label>
              </div>
            </div>

            <div v-if="hasTableLimit">
              <div class="ml-3 mb-5 flex flex-row">
                <div class="basis-full pr-5">
                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Inside Bet</span>
                  <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on inside bets.</p>
                </div>
                <input type="number" id="bank" class="input shrink-0 w-40" v-model="minInsideBet" >
              </div>

              <div class="ml-3 mb-10 flex flex-row">
                <div class="basis-full pr-5">
                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Inside Bet</span>
                  <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on inside bets.</p>
                </div>
                <input type="number" id="bank" class="input shrink w-40" v-model="maxInsideBet" >
              </div>

              <div class="ml-3 mb-5 flex flex-row">
                <div class="basis-full pr-5">
                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Min Outside Bet</span>
                  <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on outside bets.</p>
                </div>
                <input type="number" id="bank" class="input shrink w-40" v-model="minOutsideBet" >
              </div>

              <div class="ml-3 mb-10 flex flex-row">
                <div class="basis-full pr-5">
                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Max Outside Bet</span>
                  <p class="mt-2 text-gray-300 text-sm">Set the minimum bet allowed on outside bets.</p>
                </div>
                <input type="number" id="bank" class="input shrink w-40" v-model="maxOutsideBet" >
              </div>
            </div>

<!--            <div class="mb-5 flex flex-row">-->
<!--              <div class="basis-full pr-5">-->
<!--                <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Real Time Simulation</span>-->
<!--                <p class="mt-2 text-gray-300 text-sm">Turn on to simulate real time play. This setting will simulate real time by setting a time between spins like at a real casino. This will not slow down online game play but instead will calculate how long the spins you take would have taken at a real casino. You can set limits to simulate real casino play.</p>-->
<!--              </div>-->
<!--              <div class="pt-3">-->
<!--                <label class="relative inline-flex items-center cursor-pointer">-->
<!--                  <input :checked="realTime" @input="toggleRealTime" type="checkbox" value="" class="sr-only peer">-->
<!--                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>-->
<!--                </label>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div v-if="hasRealTime">-->
<!--              <div class="ml-3 mb-5 flex flex-row">-->
<!--                <div class="basis-full pr-5">-->
<!--                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Time at Table (minutes)</span>-->
<!--                  <p class="mt-2 text-gray-300 text-sm">In order to better simulate actual play at a real roulette table this setting lets you place a limit on the amount of time you'd be able to spend at the table. It will calculate the time per spin set below after each spin and not allow you to so any more spins for a particular game.</p>-->
<!--                </div>-->
<!--                <input type="number" id="bank" class="input shrink w-40" v-model="timeAtTable" >-->
<!--              </div>-->

<!--              <div class="ml-3 mb-6 flex flex-row">-->
<!--                <div class="basis-full pr-5">-->
<!--                  <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">Time Per Spin (minutes)</span>-->
<!--                  <p class="mt-2 text-gray-300 text-sm">The amount of time that each spin would take in real life. This will be calculated after each spin and you will not be able to make more spins once the max time has been reached.</p>-->
<!--                </div>-->
<!--                <input type="number" id="bank" class="input shrink w-40" v-model="timePerSpin" >-->
<!--              </div>-->
<!--            </div>-->

          </form>
        </div>
      </div>
    </slide-in-from-right-transition>
  </div>

  <fade-in-transition>
    <div v-if="show" @click="$emit('close')" class="bg-black absolute top-0 left-0 opacity-40 z-0 w-full h-full"></div>
  </fade-in-transition>
</template>

<style>
.slider-panel {
  -webkit-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  -moz-box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
  box-shadow: -8px 0px 51px 8px rgba(0,0,0,0.58);
}

.input {
  @apply h-10 bg-green-650 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-green-500 dark:border-green-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import { debounce } from "@/lib/Utils";
import formatter from "@/lib/formatter";
import FadeInTransition from "@/components/ui/Transitions/FadeInTransition.vue";
import SlideInFromRightTransition from "@/components/ui/Transitions/SlideInFromRightTransition.vue";

const debounceTimeout = 1000;
export default {
  components: { SlideInFromRightTransition, FadeInTransition },
  setup () {
    const toast = useToast();
    return { toast };
  },
  created () {
    this.debounceMinInsideBet = debounce(this.minInsideBetHandler, debounceTimeout);
    this.debounceMinOutsideBet = debounce(this.minOutsideBetHandler, debounceTimeout);
    this.debounceMaxInsideBet = debounce(this.maxInsideBetHandler, debounceTimeout);
    this.debounceMaxOutsideBet = debounce(this.maxOutsideBetHandler, debounceTimeout);
    this.debounceTimeAtTable = debounce(this.timeAtTableHandler, debounceTimeout);
    this.debounceTimePerSpin = debounce(this.timePerSpinHandler, debounceTimeout);
    this.debounceBank = debounce(this.bankHandler, debounceTimeout);
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      bank: 1000,
      minInsideBet: 10,
      minOutsideBet: 10,
      maxInsideBet: 1000,
      maxOutsideBet: 2000,
      timeAtTable: '',
      timePerSpin: ''
    }
  },
  computed: {
    ...mapGetters('settings', [
      'getMinInside',
      'getMaxInside',
      'getMaxOutside',
      'getMinOutside',
      'getTimeAtTable',
      'getTimePerSpin',
      'hasTableLimit',
      'hasRealTime'
    ]),
    ...mapGetters('bank', ['startBalance'])
  },
  watch: {
    bank: {
      handler (newVal) {
        this.debounceBank(newVal);
      },
      deep: true
    },
    minInsideBet: {
      handler (newVal) {
        this.debounceMinInsideBet(newVal);
      },
      deep: true
    },
    minOutsideBet: {
      handler (newVal) {
        this.debounceMinOutsideBet(newVal);
      },
      deep: true
    },
    maxInsideBet: {
      handler (newVal) {
        this.debounceMaxInsideBet(newVal);
        this.maxInsideBet = newVal;
      },
      deep: true
    },
    maxOutsideBet: {
      handler (newVal) {
        this.debounceMaxOutsideBet(newVal);
      },
      deep: true
    },
    timeAtTable: {
      handler (newVal) {
        this.debounceTimeAtTable(newVal);
      },
      deep: true
    },
    timePerSpin: {
      handler (newVal) {
        this.debounceTimePerSpin(newVal);
      },
      deep: true
    },
  },
  methods: {
    ...mapActions('bank', ['updateStartBalance']),
    ...mapActions('settings', [
      'setTableLimit',
      'setRealTime',
      'setMinInside',
      'setMinOutside',
      'setMaxOutside',
      'setMaxInside',
      'setTimeAtTable',
      'setTimePerSpin'
    ]),
    minInsideBetHandler (value) {
      this.toast.success(`Min Inside Bet has been updated to ${formatter.money(value)}`);
      this.setMinInside(value);
    },
    bankHandler (value) {
      this.toast.success(`Starting bank balance has been updated to ${formatter.money(value)}`);
      this.updateStartBalance(value);
    },
    minOutsideBetHandler (value) {
      this.toast.success(`Min Outside Bet has been updated to ${formatter.money(value)}`);
      this.setMinOutside(value);
    },
    maxInsideBetHandler (value) {
      this.toast.success(`Max Inside Bet has been updated to ${formatter.money(value)}`);
      this.setMaxInside(value);
    },
    maxOutsideBetHandler (value) {
      this.toast.success(`Max Outside Bet has been updated to ${formatter.money(value)}`);
      this.setMaxOutside(value);
    },
    timePerSpinHandler (value) {
      this.toast.success(`The time per spin has been updated to ${value} minutes`);
      this.setTimePerSpin(value);
    },
    timeAtTableHandler (value) {
      this.toast.success(`Time at Table has been updated to ${value} minutes`);
      this.setTimeAtTable(value);
    },
    toggleTableLimit (event) {
      this.setTableLimit(event.target.checked);
    },
    toggleRealTime (event) {
      this.setRealTime(event.target.checked);
    }
  }
}
</script>