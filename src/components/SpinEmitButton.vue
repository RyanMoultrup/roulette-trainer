<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="isEmitting ? stopSpinStream() : startSpinStream()"
  >
    <svg class="-ml-0.5 mr-2 h-4 w-4" x-description="Heroicon name: solid/mail"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
         aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
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