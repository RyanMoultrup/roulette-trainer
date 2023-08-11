<template>
  <div>
    <div class="h-screen overflow-hidden flex flex-col">
      <!-- Top nav-->
      <app-header
          @show="showPanel = true"
      />
      <!-- Bottom section -->
      <div class="min-h-0 flex-1 flex overflow-auto">
        <!-- Narrow sidebar-->
        <side-nav />
        <slot></slot>
      </div>
      <slide-panel
          class="relative"
          :show="showPanel"
          @close="showPanel = !showPanel"
      />
<!--      <base-modal/>-->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onMounted } from "vue";
import { useStore } from "vuex";
import SideNav from "@/components/ui/SideNav.vue";
import SlidePanel from "@/components/ui/SlidePanel.vue";
import BaseModal from "@/components/ui/Base/BaseModal.vue";
import { default as AppHeader } from "@/components/ui/Header.vue";

export default {
  name: 'App',
  components: { SlidePanel, AppHeader, SideNav, BaseModal },
  setup () {
    const showPanel = ref(false)
    const store = useStore()

    onMounted(() => {
      if (!store.getters['user/isAuthenticated']) {
        store.dispatch('user/setUserFromToken')
      }
    })

    return {
      showPanel
    }
  }
}
</script>
