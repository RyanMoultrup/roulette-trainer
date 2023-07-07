<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="spin"
  >
    <font-awesome-icon icon="fa-solid fa-rotate" class="mr-1" />
    Spin
  </button>
</template>
<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";
import { spin } from "@/lib/table/wheel";

export default {
  setup () {
    const toast = useToast();
    return { toast };
  },
  methods: {
    ...mapActions('simulation', ['play']),
    spin () {
      this.play(spin());
    }
  }
}
</script>