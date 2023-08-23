<template>
  <div :class="gridClass" class="flex flex-row gap-3 bg-green-800">
    <div class="h-full ">
      <spin-history-bar />
    </div>

    <div class="flex flex-col justify-start gap-4 p-3">
      <div class="font-lobster text-2xl text-gray-400">Spin History</div>
      <div class="flex justify-center w-full">
        <radial-wheel-chart />
      </div>
      <span class="font-lobster text-gray-400 text-xl">Outside</span>
      <div class="flex flex-row gap-3 rounded">
        <div class="flex flex-col gap-3">
          <red-black-chart />
          <even-odd-chart />
        </div>
        <div class="flex flex-col gap-3">
          <twelves-chart />
          <half-board-chart />
        </div>
      </div>
      <span class="font-lobster text-gray-400 text-xl">Inside</span>
      <div class="bg-accent-150 rounded p-2">
        <hits-chart class="bet-display" />
      </div>
    </div>
  </div>
</template>

<script>
import {useGridProps} from "@/composables/useGridProp"
import HitsChart from "@/components/charts/HitsChart.vue"
import EvenOddChart from "@/components/charts/EvenOddChart.vue"
import TwelvesChart from "@/components/charts/TwelvesChart.vue"
import RedBlackChart from "@/components/charts/RedBlackChart.vue"
import HalfBoardChart from "@/components/charts/HalfBoardChart.vue"
import RadialWheelChart from "@/components/charts/RadialWheelChart.vue"
import SpinHistoryBar from "@/components/SpinHistoryBar.vue";

export default {
  components: {
    SpinHistoryBar,
    HitsChart,
    EvenOddChart,
    TwelvesChart,
    RedBlackChart,
    HalfBoardChart,
    RadialWheelChart
  },
  props: {
    ...useGridProps()
  }
}
</script>