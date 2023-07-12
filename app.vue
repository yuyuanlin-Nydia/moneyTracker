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
