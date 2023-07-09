<script lang="ts" setup>
const user = useUser()
const { isLoggedIn, userInfo } = storeToRefs(user)

user.getUser()
</script>

<template>
  <nav class="bg-primary-200 h-[4rem] text-gray-500 font-bold px-3 flex justify-between items-center text-xl">
    <NuxtLink to="/" class=" font-bold text-primary-500">
      <Icon name="solar:chat-round-money-bold" class="text-4xl rounded bg-primary-200 md:text-xl" />
      <span class="align-middle">
        MoneyTracker
      </span>
    </NuxtLink>
    <div>
      <NuxtLink v-slot="{ isActive }" to="/ProductPlan" title="Product Plan">
        <span :class="['mx-3', 'hover:underline', isActive ? 'text-black' : 'hover:text-gray-500']">Product Plan</span>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" class="mx-3" to="/auth/logIn" title="Log In" v-if="!isLoggedIn">
        <span :class="['hover:underline', isActive ? 'text-black' : 'hover:text-gray-500']">Log in</span>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" class="mx-3" to="/auth/signUp" title="Sign Up" v-if="!isLoggedIn">
        <span :class="['hover:underline', isActive ? 'text-black' : 'hover:text-gray-500']">Sign up</span>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" class="mx-3" to="/user/overview" title="Account" v-if="isLoggedIn">
        <span :class="['hover:underline', isActive ? 'text-black' : 'hover:text-gray-500']">{{ userInfo.userName }}'s
          dashboard</span>
      </NuxtLink>
    </div>
  </nav>
</template>