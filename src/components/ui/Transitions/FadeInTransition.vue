<template>
  <transition name="fade-in">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity .3s
}
.fade-in-enter, .fade-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
