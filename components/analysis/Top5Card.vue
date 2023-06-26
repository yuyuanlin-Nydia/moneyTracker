<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  items: Object as PropType<IWalletItem[]>
})
</script>

<template>
  <p class="text-2xl bg-primary-400 mb-4">Top 5</p>
  <table class="w-full" v-if="items?.length">
    <thead>
      <tr class="text-left text-gray-400">
        <th>Rank</th>
        <th>Category</th>
        <th>Item</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-primary-100" v-for="(item, idx) in props.items">
        <td class="text-2xl text-secondary-100">{{ idx + 1 }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.item }}</td>
        <td>${{ item.amount }}</td>
        <td>{{ dayjsTz(item.date).format('YYYY/MM/DD') }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else class="text-xl text-gray-300 w-full">
    No data exists!
  </p>
</template>