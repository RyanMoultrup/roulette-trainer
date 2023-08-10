<template>
  <main>
    <div>
      <base-input label="Username" />
      <base-input label="Email" />
      <base-input label="Password" type="password" />
    </div>
  </main>
</template>

<script>

import {defineComponent} from "vue";
import BaseInput from "@/components/ui/Base/BaseInput.vue";

export default defineComponent({
  components: {BaseInput}
})
</script>
