<template>
  <nav aria-label="Sidebar" class="hidden bg-gradient-to-b from-accent-100 from-0% via-green-800 via-20% to-green-800 border-r border-green-700 md:block md:flex-shrink-0 md:overflow-y-auto">
    <div class="relative w-20 flex flex-col p-3 space-y-3">

      <a href="#"
         @click.prevent="router.push({ name: 'home' })"
         class="bg-green-900 text-gray-400 text-2xl flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
        <span class="sr-only">Home</span>
        <font-awesome-icon icon="fa-solid fa-house" />
      </a>

      <a href="#"
         @click.prevent="router.push({ name: 'play' })"
         class="bg-green-900 text-gray-400 text-2xl flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg">
        <span class="sr-only">Play</span>
        <font-awesome-icon icon="fa-solid fa-circle-play" />
      </a>

    </div>
  </nav>
</template>
<script>
import { useRouter } from "vue-router";

export default {
  setup () {
    const router = useRouter()

    return {
      router
    }
  }
}
</script>
