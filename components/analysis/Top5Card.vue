<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  items: Object as PropType<IWalletItem[]>,
})
</script>

<template>
  <p class="text-2xl text-white mb-4">
    Top 5
  </p>
  <table v-if="items?.length" class="w-full text-center">
    <thead>
      <tr class="text-gray-200 dark:text-gray-400">
        <th>Rank</th>
        <th>Category</th>
        <th>Item</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, idx) in props.items"
        :key="item._id"
        class="border-b border-secondary-100 dark:border-secondary-100 font-bold"
      >
        <td class="text-2xl text-secondary-100">
          {{ idx + 1 }}
        </td>
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
