<template>
  <button
      type="button"
      class="play inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-accent-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700"
      @click="spin"
  >
    <font-awesome-icon icon="fa-solid fa-rotate" class="mr-1" />
    Spin
  </button>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import { spin } from "@/lib/table/wheel";

export default {
  setup () {
    const toast = useToast();
    return { toast };
  },
  computed: {
    ...mapGetters('strategy', ['canSpin', 'hasBets']),
  },
  methods: {
    ...mapActions('simulation', ['play']),
    spin() {
      this.canSpin
        ? this.play(spin())
        : this.triggerToast()
    },
    triggerToast () {
      this.hasBets
          ? this.toast.error('Inside bet minimum has not been reached')
          : this.toast.error('Please place a bet before you can spin');
    }
  }
}
</script>