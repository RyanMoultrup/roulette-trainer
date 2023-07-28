<template>
<!--  <div id="chips-container" class="chips-panel absolute -bottom-8 right-1/4 transition duration-500 ease-in-out transform hover:-translate-y-3/4 hover:scale-110 "> &lt;!&ndash; -bottom-8 &ndash;&gt;-->
  <div id="chips-container" class="chips-panel flex flex-row justify-start w-full px-4"> <!-- -bottom-8 -->

    <div class="flex flex-col justify-end gap-3 p-2 mr-2">
      <double-bet-button />
      <replay-last-bet-button />
    </div>
    <div>
      <selected-chip class="font-lobster mb-4 text-gray-300 text-xl"/>
      <div class="chips grid grid-cols-4 gap-4">
        <chip v-for="chip in chips()" :color="chip.color" size="lg" :chipValue="chip.value" @chipSelected="chipSelected"></chip>
      </div>
    </div>

  </div>
</template>

<script>
import Chip from '@/components/Chip.vue';
import DoubleBetButton from "@/components/DoubleBetButton.vue";
import ReplayLastBetButton from "@/components/ReplayLastBetButton.vue";
import SelectedChip from "@/components/SelectedChip.vue";
import chips from '@/lib/table/chips';

export default {
  components: { SelectedChip, Chip, DoubleBetButton, ReplayLastBetButton },
  methods: {
    chips() {
      return chips
    },
    chipSelected (chip) {
      this.$emit('chipSelected', chip);
    }
  }
}
</script>