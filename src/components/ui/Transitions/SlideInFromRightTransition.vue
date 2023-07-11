<template>
  <transition name="slide-from-right">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.slide-from-right-enter-active {
  transition: all 400ms ease-in
}

.slide-from-right-leave-active {
  transition: all 250ms ease-out
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(100%)
}
</style>
