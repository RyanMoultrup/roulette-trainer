<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-accent-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="isEmitting ? stopSpinStream() : startSpinStream()"
  >
    <font-awesome-icon icon="fa-solid fa-explosion" class="mr-1" />
    {{ isEmitting ? "Stop Emitting" : "Start Emitting" }}
  </button>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import spinEmitter from "@/lib/SpinEmitter";

export default {
  computed: {
    ...mapGetters('simulation', ['isEmitting']),
  },
  methods: {
    ...mapMutations('simulation', ['updateSpinEmit']),
    startSpinStream () {
      this.updateSpinEmit(true);
      spinEmitter.start(1);
    },
    stopSpinStream () {
      this.updateSpinEmit(false);
      spinEmitter.stop();
    }
  }
}
</script>