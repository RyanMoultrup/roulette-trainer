<template>
  <div class="flex flex-col justify-between bg-green-800 gap-3 p-3">
  <div class="font-lobster text-2xl text-gray-400">Spin History</div>
  <div class="flex flex-row gap-3">
    <!--              <span class="font-lobster">Outside</span>-->
    <div class="flex flex-col gap-3">
      <red-black-chart />
      <even-odd-chart />
    </div>
    <div class="flex flex-col gap-3">
      <twelves-chart />
      <half-board-chart />
    </div>
  </div>

  <hits-chart class="bet-display" />
  </div>
</template>

<script setup>
import HitsChart from "@/components/charts/HitsChart.vue";
import EvenOddChart from "@/components/charts/EvenOddChart.vue";
import TwelvesChart from "@/components/charts/TwelvesChart.vue";
import RedBlackChart from "@/components/charts/RedBlackChart.vue";
import HalfBoardChart from "@/components/charts/HalfBoardChart.vue";
</script>