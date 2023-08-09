<template>
  <div class="text-gray-300 opacity-90 font-lobster text-3xl" id="rounds">
    Rounds: <span>{{ rounds }}</span
  ></div>
</template>
<script>
export default {
  data () {
    return {
      rounds: 0
    }
  },
  watch: {
    '$store.state.simulation.rounds': function (val) {
      this.rounds = val;
    }
  },
}
</script>
