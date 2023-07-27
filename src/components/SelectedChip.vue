<template>
  <div class="flex flex-row">
    <span>Selected </span>
    <span class="ml-2">
      <chip
          size="md"
          :color="selectedChip.color"
          :chipValue="String(selectedChip.value)"
          :emitSelection="false"
      ></chip>
    </span>
  </div>
</template>
<script>
import Chip from "@/components/Chip.vue";
import { mapGetters } from "vuex";

export default {
  components: { Chip },
  computed: {
    ...mapGetters('simulation', ['selectedChip']),
  }
}
</script>