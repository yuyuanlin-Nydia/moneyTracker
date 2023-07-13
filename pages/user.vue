<script setup lang="ts">
const user = useUserStore()
useHead({
  title: `${user.userInfo.userName}\'s Dashboard`,
})
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})
</script>

<template>
  <NuxtPage />
</template>
