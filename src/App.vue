<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      console.log('this.$route.meta.layout', this.$route.meta.layout)
      return this.$route.meta.layout || 'default';
    }
  }
}
</script>
