<template>
  <nav class="sticky top-0 h-screen flex flex-col text-lg col-span-1  text-right text-primary-100 border-r-2 border-primary-400 px-4">
    <NuxtLink to="/" class=" font-bold text-white py-6 pr-2">
      <Icon name="solar:chat-round-money-bold" class="text-4xl rounded bg-primary-200 md:text-xl" />
      <span class="hidden md:inline">
        MoneyTracker
      </span>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/" title="Overview">
      <div :class="['mt-5', isActive? 'text-secondary-100':'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Overview</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:folder-copy" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/wallet" title="Wallet">
      <div :class="['mt-5', isActive? 'text-secondary-100':'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Wallet</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-balance-wallet" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/analysis" title="Analysis">
      <div :class="['mt-5', isActive? 'text-secondary-100':'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Analysis</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:list-alt-rounded" />
      </div>
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/account" title="Account">
      <div :class="['mt-5', isActive? 'text-secondary-100':'hover:text-primary-200']">
        <span class="pr-1 hidden md:inline">Account</span>
        <Icon class="mr-2 text-4xl md:text-xl" name="material-symbols:account-box" />
      </div>
    </NuxtLink>
    <!-- <NuxtLink v-if="!user.isLoggedIn" class="pt-1" to="/login" title="Login">
      <div :class="['mt-5', isActive? 'text-secondary-100':'hover:text-primary-200']">
         <span class="pr-1">Login</span>
          <Icon name="clarity:login-solid" />
      </div>
    </NuxtLink> -->
    <a
      href="#"
      title="Logout"
      class="mr-2 absolute bottom-8 right-0 border-r-4 border-transparent hover:text-primary-200 "
      @click.prevent="user.isLoggedIn = false"
    >
      <span class="pr-1 hidden md:inline">Logout</span>
      <Icon class="mr-2 text-4xl md:text-xl" name="clarity:logout-solid" />
    </a>
  </nav>
</template>