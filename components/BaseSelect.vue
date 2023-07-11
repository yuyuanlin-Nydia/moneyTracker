<script lang="ts" setup>
withDefaults(defineProps<{
  list: any[]
  modelValue: string
  customClass?: string[]
}>(), {
  customClass: () => [],
})
const emits = defineEmits(['update:modelValue'])

function updateSelect(e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <select
    :class="['text-black', 'w-56', 'p-1', 'rounded'].concat(customClass)"
    @change="updateSelect"
  >
    <option
      v-for="item in list"
      :key="item"
      :value="item"
      :selected="item === modelValue"
    >
      {{ item }}
    </option>
  </select>
</template>
