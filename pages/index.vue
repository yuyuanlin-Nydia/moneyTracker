<script lang="ts" setup>
const colorMode = useColorMode()
</script>

<template>
  <main class="text-center my-6 flex flex-col justify-center">
    <div class="flex items-center flex-col mb-6">
      <p class="text-4xl border-b-2 border-secondary-100 font-bold mb-3">
        MoneyTracker
      </p>
      <p class="text-lg text-gray-600 dark:text-gray-400 w-3/5">
        <b>MoneyTracker</b> is a great tool to track your expense and Income. There are easy-understanding layouts and a
        large amount of analysis data.
      </p>
    </div>
    <div class="flex items-center flex-col mb-6">
      <p class="text-4xl border-b-2 border-secondary-100 font-bold mb-3">
        Features
      </p>
      <div class="grid grid-flow-row grid-cols-3 gap-6 text-lefts">
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Rich Analysis Report</span>
        </div>
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Search</span>
        </div>
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Category Group</span>
        </div>
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Rich Analysis Report</span>
        </div>
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Rich Analysis Report</span>
        </div>
        <div class="text-lg text-gray-600 dark:text-gray-300">
          <Icon
            name="material-symbols:stars"
            class="text-3xl mr-2 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200"
          />
          <span>Rich Analysis Report</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <p class="text-4xl border-b-2 border-secondary-100 font-bold mb-1">
        Snapshot
      </p>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-3">
        Overview, Wallet, and Analysis
      </p>
      <div class="columns-3">
        <div class="md:h-72 lg:h-[420px] border border-secondary-100 dark:border-white rounded-md p-3">
          <img class="w-full" src="/snapshot/Overview-dark.png" alt="Overview">
        </div>
        <div class="md:h-72 lg:h-[420px] border border-secondary-100 dark:border-white rounded-md p-3">
          <img class="w-full" src="/snapshot/Wallet-dark.png" alt="Overview">
        </div>
        <div class="md:h-72 lg:h-[420px] border border-secondary-100 dark:border-white rounded-md p-3">
          <img class="w-full" src="/snapshot/Analysis-dark.png" alt="Analysis">
        </div>
      </div>
    </div>
  </main>
</template>
