<template>
  <fade-out-transition>
    <div v-show="showPlaceholder" :key="showPlaceholder" class="skeleton absolute top-0 left-0 rounded-md text-sm w-full py-2 flex flex-col justify-center items-center text-green-400 bg-green-600  h-full">
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
<style scoped lang="scss">
.icon-shadow { filter:drop-shadow(5px 7px rgba(10,41,22,.75)) }
.gradient {
  @apply bg-gradient-to-tr from-green-700 via-green-600 to-green-700
}

$color-base: #104224;
$color-highlight: lighten($color-base, 2%);

.skeleton {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: $color-base;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, $color-base, $color-highlight, $color-base);
    animation: progress 8s ease-in-out infinite;
  }
}

@keyframes progress {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>