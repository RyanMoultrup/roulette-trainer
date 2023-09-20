<template>
  <div class="rounded text-gray-400">
    <div class="flex flex-col justify-between h-full grow">
      <div class="flex flex-row">
        <this-round />
        <winning-numbers />
      </div>
    </div>
  </div>
</template>

<script>
import ThisRound from "@/components/ThisRound.vue";
import WinningNumbers from "@/components/WinningNumbers.vue";

export default {
  components: { WinningNumbers, ThisRound }
}
</script>
