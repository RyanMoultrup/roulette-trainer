<template>
  <div class="relative flex flex-row justify-start px-4 -z-10 w-full" style="min-width: 0;"> <!-- -bottom-8 -->
    <div class="flex flex-col shrink-0 justify-end gap-3 p-2 mr-2">
      <double-bet-button />
      <replay-last-bet-button />
      <clear-bets-button />
    </div>
    <chip-selection-panel />
    <selected-chip class="font-lobster mb-4 text-gray-300 text-2xl self-start flex flex-col self-end ml-4"/>
  </div>
</template>

<script>
import SelectedChip from "@/components/SelectedChip.vue"
import ChipSelectionPanel from "@/components/ChipSelectionPanel.vue"
import DoubleBetButton from "@/components/buttons/DoubleBetButton.vue"
import ClearBetsButton from "@/components/buttons/ClearBetsButton.vue"
import ReplayLastBetButton from "@/components/buttons/ReplayLastBetButton.vue"

export default {
  components: { ChipSelectionPanel, ClearBetsButton, SelectedChip, DoubleBetButton, ReplayLastBetButton }
}
</script>

