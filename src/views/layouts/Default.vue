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
      <base-modal/>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/ui/SideNav.vue";
import { default as AppHeader } from "@/components/ui/Header.vue";
import SlidePanel from "@/components/ui/SlidePanel.vue";
import BaseModal from "@/components/ui/Base/BaseModal.vue";

export default {
  name: 'App',
  components: { SlidePanel, AppHeader, SideNav, BaseModal },
  data () {
    return {
      showPanel: false
    }
  }
}
</script>
