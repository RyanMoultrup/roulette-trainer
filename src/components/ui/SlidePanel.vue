<template>
  <div class="main-side-pane z-10 max-w-2xl overflow-x-hidden">
    <slide-in-from-right-transition>
      <slot v-if="show" ></slot>
    </slide-in-from-right-transition>
  </div>

  <fade-in-transition>
    <div v-if="show" @click="$emit('close')" class="bg-black absolute top-0 left-0 opacity-40 z-0 w-full h-full"></div>
  </fade-in-transition>
</template>

<style>
.main-side-pane {
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
<script>
import FadeInTransition from "@/components/ui/Transitions/FadeInTransition.vue";
import SlideInFromRightTransition from "@/components/ui/Transitions/SlideInFromRightTransition.vue";

export default {
  components: { SlideInFromRightTransition, FadeInTransition },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '100%'
    }
  }
}
</script>