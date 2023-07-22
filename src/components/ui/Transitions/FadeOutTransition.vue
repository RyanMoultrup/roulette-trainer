<template>
  <transition name="fade-out">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.fade-out-leave-active {
  transition: opacity 1s;
}
.fade-out-leave-from {
  opacity: 1;
}
.fade-out-leave-to {
  opacity: 0;
}
</style>
