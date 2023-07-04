<script lang="ts" setup>
const route = useRoute()
const routeName = ref()
watch(() => route.name,
  (newRouteName) => {
    // EX: user-overview => overview
    routeName.value = (newRouteName as string)?.split('-')[1]
  }, {
  immediate: true,
})
</script>

<template>
  <div class="grid min-h-[calc(100vh-4rem)] h-full grid-cols-8  bg-primary-600 text-white">
    <UserNavBar />
    <main class="px-8 col-span-7">
      <h5 class=" text-4xl font-bold py-6">
        {{ routeName }}
      </h5>
      <slot />
    </main>
  </div>
</template>
