<template>
  <!-- Wrapper or overlay -->
  <div class="fixed inset-0 flex items-center justify-center z-[100] bg-black opacity-70 backdrop-blur-sm backdrop-filter">
    <!-- Modal -->
  </div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-md shadow-lg bg-green-600 z-[200]">
    Your Modal Content Here
    <base-input label="Username" />
    <base-input label="Email" />
    <base-input label="Password" type="password" />
  </div>

</template>

<script>
import BaseInput from "@/components/ui/Base/BaseInput.vue";

export default {
  components: {BaseInput},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>