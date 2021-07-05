<template>
  <div id="chips-container" class="absolute -bottom-8 right-1/4 transition duration-500 ease-in-out transform hover:-translate-y-8 hover:scale-110 "> <!-- -bottom-8 -->
    <div class="chips grid grid-cols-6">
      <chip color="red" size="lg" chipValue="5" @chipSelected="chipSelected"></chip>
      <chip color="blue" size="lg" chipValue="10" @chipSelected="chipSelected"></chip>
      <chip color="green" size="lg" chipValue="50" @chipSelected="chipSelected"></chip>
      <chip color="black" size="lg" chipValue="100" @chipSelected="chipSelected"></chip>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip'

export default {
  components: { Chip },
  methods: {
    chipSelected (chip) {
      this.$emit('chipSelected', chip);
    }
  }
}
</script>