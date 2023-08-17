<template>
  <div class="card-bg-border basis-full h-full gradients-green">
    <div class="rounded text-gray-400 borders layout opacity-80" :class="cssRules()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topGradient: false,
    topCornerGradient: false
  },
  methods: {
    cssRules () {
      return {
        'top-gradient': this.topGradient,
        'top-corner-gradient': this.topCornerGradient
      }
    }
  }
}
</script>

<style scoped>
.layout {
  @apply p-5 flex flex-col justify-between h-full w-full
}

.gradients-green {
  @apply bg-gradient-to-tr from-green-700 via-green-800 to-green-800
}

.top-corner-gradient {
  @apply bg-gradient-to-br from-0% from-accent-100 via-20% via-green-800
}

.top-gradient {
  @apply bg-gradient-to-b from-0% from-accent-100 via-35% via-green-800
}

.borders {
  @apply border border-green-800 shadow
}
</style>