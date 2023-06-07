<script lang="ts" setup>
const user = useUser()
const route = useRoute()
const routeName = ref()
watch(
  () => route.name,
  (newRouteName) => {
    routeName.value = newRouteName
  }, {
    immediate: true,
  },
)
</script>

<template>
  <div class="grid min-h-screen grid-cols-8 h-full bg-primary-600 text-white">
    <nav class="sticky top-0 h-screen flex flex-col text-lg col-span-1  text-right text-primary-100 border-r-2 border-primary-400 px-4">
      <NuxtLink to="/" class=" font-bold text-white py-6 pr-2">
        <Icon name="solar:chat-round-money-bold" class="text-4xl rounded bg-primary-200 md:text-xl" />
        <span class="hidden md:inline">
          MoneyTracker
        </span>
      </NuxtLink>
      <NuxtLink to="/" class="mt-5 border-r-4 border-transparent hover:text-secondary-100 hover:border-secondary-100">
        <span class="pr-1 hidden md:inline">Overview</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:folder-copy" />
      </NuxtLink>
      <NuxtLink to="/wallet" class="border-r-4 border-transparent hover:text-secondary-100 hover:border-secondary-100">
        <span class="pr-1 hidden md:inline">Wallet</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-balance-wallet" />
      </NuxtLink>
      <NuxtLink to="/budget" class="mt-1 border-r-4 border-transparent hover:text-secondary-100">
        <span class="pr-1 hidden md:inline">Budget</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:list-alt-rounded" />
      </NuxtLink>
      <NuxtLink to="/account" class="mt-1 border-r-4 border-transparent hover:text-secondary-100">
        <span class="pr-1 hidden md:inline">Account</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-box" />
      </NuxtLink>
      <!-- <NuxtLink v-if="!user.isLoggedIn" class="pt-1" to="/login">
        <span class="pr-1">Login</span>
        <Icon name="clarity:login-solid" />
      </NuxtLink> -->
      <a
        href="#" class="mr-2 absolute bottom-8 right-0 border-r-4 border-transparent hover:text-secondary-100 hover:border-secondary-100"
        @click.prevent="user.isLoggedIn = false"
      >
        <span class="pr-1 hidden md:inline">Logout</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="clarity:logout-solid" />
      </a>
    </nav>
    <main class="px-8 col-span-7">
      <h5 class=" text-4xl font-bold py-6">
        {{ routeName }}
      </h5>
      <slot />
    </main>
  </div>
</template>
