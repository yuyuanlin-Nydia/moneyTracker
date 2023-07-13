<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - MoneyTracker` : 'MoneyTracker'
  },
})
</script>

<template>
  <GlobalNavBar />
  <NuxtLayout>
    <NuxtLoadingIndicator color="#c9b8e3" :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
  <Footer />
</template>

<style>
body {
  @apply min-h-screen bg-[#FAFAFA] text-primary-600 dark:bg-primary-600 dark:text-gray-200;
}
</style>
