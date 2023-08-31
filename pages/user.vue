<script setup lang="ts">
const user = useUserStore()
useHead({
  title: `${user.userInfo.userName}\'s Dashboard`,
})
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
  keepalive: true,
})
</script>

<template>
  <NuxtPage />
</template>
