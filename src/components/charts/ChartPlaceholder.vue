<template>
  <fade-out-transition>
    <div v-show="showPlaceholder" :key="showPlaceholder" class="absolute text-3xl  h-full w-full flex flex-col justify-center items-center text-green-400 bg-green-600">
        <font-awesome-icon class="text-9xl icon-shadow mb-4" :icon="icon" />
      <span class="title font-lobster text-gray-300"> {{ title }}</span>
    </div>
  </fade-out-transition>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FadeOutTransition from "@/components/ui/Transitions/FadeOutTransition.vue";

export default {
  components: { FadeOutTransition, FontAwesomeIcon },
  props: {
    icon: '',
    title: '',
    showPlaceholder: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped>
.icon-shadow { filter:drop-shadow(5px 7px rgba(10,41,22,.75)) }
</style>