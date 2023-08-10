<template>
  <div class="mb-10 flex flex-row">
    <div class="basis-full pr-5">
      <span class="text-normal block font-medium text-gray-900 dark:text-white border-b border-b-green-500">{{ label }}</span>
      <p v-if="description" class="mt-2 text-gray-300 text-sm">{{ description }}</p>
    </div>
    <input type="{{ type }}" id="bank" class="input flex-none w-40" v-model="bank" >
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    debounce: {
      type: Boolean,
      default: false
    }
  }
}
</script>