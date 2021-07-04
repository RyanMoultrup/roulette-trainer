<template>
  <div id="bets-container" class="flex-grow">
    <div class="bg-white bg-opacity-10 shadow overflow-y-auto flex-1">
      <ul class="divide-y divide-green-900">

        <li v-for="(bet, index) in bets" :key="bet.betType()" class="group">
          <a href="#" class="block hover:bg-white hover:bg-opacity-5 relative">
            <span @click="removeBet($event, index)" class="group-hover:opacity-100 opacity-0 absolute cursor-pointer w-4 h-4 pb-1 text-xs text-center rounded-full bg-white bg-opacity-30 right-1 top-1 text-white">x</span>
            <div class="px-3 py-4 ">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-white truncate">
                  {{ bet.name() }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    ${{ bet.get() }}
                  </p>
                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ${{ bet.payout() }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-start">
                <span
                    v-for="spot in bet.winningSpots()"
                    :key="spot.spot"
                    class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full"
                    :class="spot.color === 'red' ? 'bg-red-800' : 'bg-black'"
                >
                  {{ spot.spot }}
                </span>
              </div>
            </div>
          </a>
        </li>

<!--        <li>-->
<!--          <a href="#" class="block hover:bg-white hover:bg-opacity-5">-->
<!--            <div class="px-4 py-4 sm:px-6">-->
<!--              <div class="flex items-center justify-between">-->
<!--                <p class="text-sm font-medium text-white truncate">-->
<!--                  19 to 36-->
<!--                </p>-->
<!--                <div class="ml-2 flex-shrink-0 flex">-->
<!--                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">-->
<!--                    $50-->
<!--                  </p>-->
<!--                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">-->
<!--                    $550-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mt-2 grid grid-cols-9 gap-0.5">-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">19</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">20</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">21</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">22</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">23</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">24</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">25</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">26</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">27</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">28</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">29</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">30</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">31</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">32</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">33</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">34</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">35</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">36</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </a>-->
<!--        </li>-->

<!--        <li>-->
<!--          <a href="#" class="block hover:bg-white hover:bg-opacity-5">-->
<!--            <div class="px-4 py-4 sm:px-6">-->
<!--              <div class="flex items-center justify-between">-->
<!--                <p class="text-sm font-medium text-white truncate">-->
<!--                  1st 18-->
<!--                </p>-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  1:11&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  37%&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                <div class="ml-2 flex-shrink-0 flex">-->
<!--                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">-->
<!--                    $50-->
<!--                  </p>-->
<!--                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">-->
<!--                    $550-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mt-2 grid grid-cols-9">-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li>-->
<!--          <a href="#" class="block hover:bg-white hover:bg-opacity-5">-->
<!--            <div class="px-4 py-4 sm:px-6">-->
<!--              <div class="flex items-center justify-between">-->
<!--                <p class="text-sm font-medium text-white truncate">-->
<!--                  1st 18-->
<!--                </p>-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  1:11&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  37%&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                <div class="ml-2 flex-shrink-0 flex">-->
<!--                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">-->
<!--                    $50-->
<!--                  </p>-->
<!--                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">-->
<!--                    $550-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mt-2 grid grid-cols-9">-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li>-->
<!--          <a href="#" class="block hover:bg-white hover:bg-opacity-5">-->
<!--            <div class="px-4 py-4 sm:px-6">-->
<!--              <div class="flex items-center justify-between">-->
<!--                <p class="text-sm font-medium text-white truncate">-->
<!--                  1st 18-->
<!--                </p>-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  1:11&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                &lt;!&ndash;                                <p class="text-sm font-medium text-white truncate">&ndash;&gt;-->
<!--                &lt;!&ndash;                                  37%&ndash;&gt;-->
<!--                &lt;!&ndash;                                </p>&ndash;&gt;-->
<!--                <div class="ml-2 flex-shrink-0 flex">-->
<!--                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">-->
<!--                    $50-->
<!--                  </p>-->
<!--                  <p class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">-->
<!--                    $550-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mt-2 grid grid-cols-9">-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">1</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">2</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">3</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">4</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">5</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">6</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">7</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">8</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">9</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">10</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">11</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">12</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">13</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">14</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">15</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">16</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-red-800 red-bet">17</span>-->
<!--                <span class="bet-spot-img pt-0.5 w-5 h-5 text-xs text-center text-white rounded-full bg-black red-bet">18</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </a>-->
<!--        </li>-->

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    removeBet (event, index) {
      // console.log(event);
      this.$emit('betRemoved', index);
    }
  }
}
</script>