<script lang="ts" setup>
const user = useUser()
</script>

<template>
  <nav
    class="sticky top-0 min-h-[calc(100vh-4rem)] flex flex-col text-lg col-span-1  text-right text-primary-100 border-r-2 border-primary-400 px-4"
  >
    <NuxtLink v-slot="{ isActive }" to="/user/overview" title="Overview">
      <div class="mt-5" :class="[isActive ? 'text-secondary-100' : 'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Overview</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:folder-copy" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/user/wallet" title="Wallet">
      <div class="mt-5" :class="[isActive ? 'text-secondary-100' : 'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Wallet</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-balance-wallet" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/user/analysis" title="Analysis">
      <div class="mt-5" :class="[isActive ? 'text-secondary-100' : 'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Analysis</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:list-alt-rounded" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/user/account" title="Account">
      <div class="mt-5" :class="[isActive ? 'text-secondary-100' : 'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Account</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-box" />
      </div>
    </NuxtLink>
    <a href="#" title="Logout" class="mt-5 hover:text-primary-200 " @click="user.logout()">
      <span class="pr-1 hidden md:inline">Logout</span>
      <Icon class="mr-2 text-4xl md:text-xl" name="clarity:logout-solid" />
    </a>
  </nav>
</template>
