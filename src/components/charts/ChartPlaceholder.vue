<template>
  <fade-out-transition>
    <div v-show="showPlaceholder" :key="showPlaceholder" class="absolute top-0 left-0 rounded-md text-sm w-full py-2 flex flex-col justify-center items-center text-green-400 bg-green-600 gradient h-full">
        <font-awesome-icon class="text-4xl icon-shadow" :icon="icon" />
    </div>
  </fade-out-transition>
  <slot></slot>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FadeOutTransition from "@/components/ui/Transitions/FadeOutTransition.vue";

export default {
  components: { FadeOutTransition, FontAwesomeIcon },
  data () {
    return {
      textSize: '',
      iconSize: ''
    }
  },
  mounted () {
    this.setSize()
  },
  props: {
    icon: '',
    size: 'lg',
    title: '',
    showPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setSize () {
      switch (this.size) {
        case 'lg':
          this.iconSize = 'text-8xl'
          break
        case 'sm':
          this.iconSize = 'text-4xl'
          break
      }
    }
  }
}
</script>
<style scoped>
.icon-shadow { filter:drop-shadow(5px 7px rgba(10,41,22,.75)) }
.gradient {
  @apply bg-gradient-to-tr from-green-700 via-green-600 to-green-700
}
</style>