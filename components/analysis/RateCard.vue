<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  item: Object as PropType<getWalletRateAndTotalRes>,
})
const rateStyle = {
  Increase() {
    return 'bg-green-100 text-green-500'
  },
  Decrease() {
    return 'bg-red-100 text-red-500'
  },
  Balance() {
    return 'bg-white text-black dark:bg-black dark:text-white'
  },
}

function getRateText(rate: string) {
  if (Number.parseFloat(rate) > 0)
    return 'Increase'
  else if (Number.parseFloat(rate) < 0)
    return 'Decrease'
  else return 'Balance'
}

function getRateStyle(rate: string) {
  return rateStyle[getRateText(rate)]()
}

function getIcon(rate: string) {
  return Number.parseFloat(rate) > 0
    ? 'heroicons-solid:arrow-circle-up'
    : Number.parseFloat(rate) < 0
      ? 'heroicons-solid:arrow-circle-down'
      : 'heroicons-solid:minus-circle'
}
</script>

<template>
  <div v-if="props.item" class="rounded-md border-secondary-100 border  bg-primary-100 dark:bg-primary-400 mb-5 basis-[48%]">
    <div class="font-bold text-2xl  border-secondary-100 border-b p-2">
      {{ props.item.type }}
    </div>
    <div class="p-2 flex justify-between items-start">
      <div class="mr-6">
        <span class="text-xl font-bold">$ {{ props.item.total.toLocaleString() }}</span> <br>
        <span class="text-gray-700 dark:text-gray-400 text-xs">THIS MONTH</span>
      </div>
      <div class="flex">
        <div class="rounded-lg p-1 mr-2 min-w-[140px] text-center" :class="[getRateStyle(props.item.MoM)]">
          <Icon :name="getIcon(props.item.MoM)" class="rounded-full p-1 text-2xl" />
          <span>{{ props.item.MoM }}%</span>
          <span>/MoM</span>
        </div>
        <div class="rounded-lg p-1 min-w-[140px] text-center" :class="[getRateStyle(props.item.YoY)]">
          <Icon :name="getIcon(props.item.YoY)" class="rounded-full p-1 text-2xl" />
          <span>{{ props.item.YoY }}%</span>
          <span>/YoY</span>
        </div>
      </div>
    </div>
  </div>
</template>
