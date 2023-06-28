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
  <div class="grid min-h-screen grid-cols-8 h-full bg-primary-600 text-white">
    <NavBar />
    <main class="px-8 col-span-7">
      <h5 class=" text-4xl font-bold py-6">
        {{ routeName }}
      </h5>
      <slot />
    </main>
  </div>
</template>
