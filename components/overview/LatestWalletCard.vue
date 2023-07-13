<script lang="ts" setup>
defineProps<{
  title: string
  list: Record<string, any>[]
}>()
</script>

<template>
  <div class="card bg-primary-100 dark:bg-primary-500 w-full h-[38vh]">
    <div class="flex items-center justify-between mb-1">
      <h3 class="text-2xl font-bold">
        {{ title }}
      </h3>
      <NuxtLink
        :to="`/user/wallet?type=${title}`"
        class="btn dark:text-gray-400 hover:bg-primary-200 hover:text-gray-300 hover:dark:text-white transition ease-out duration-1000"
      >
        View Wallet
      </NuxtLink>
    </div>
    <template v-if="list.length">
      <ul>
        <li
          v-for="item in list" :key="item._id"
          class="flex justify-between items-center border-b border-secondary-100 py-1"
        >
          <div>
            <span class="text-sm block font-bold">{{ item.item }}</span>
            <span class="details leading-3">{{ item.category }}</span>
          </div>
          <div>
            <span class="font-bold block">${{ item.amount.toLocaleString() }}</span>
            <span class="details leading-3">{{ dayjsTz(item.date).format('YYYY/MM/DD') }}</span>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="dark:text-gray-300 center h-3/4">
        There is no record yet!
      </div>
    </template>
  </div>
</template>
