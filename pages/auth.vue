<script setup lang="ts">
import { Tab, TabGroup, TabList, TransitionRoot } from '@headlessui/vue'

const isTransition = ref<boolean>(true)
const route = useRoute()

watch(() => route.fullPath, () => {
  isTransition.value = false

  setTimeout(() => {
    isTransition.value = true
  }, 500)
})
definePageMeta({
  layout: 'plain',
  middleware: [function () {
    const token = useCookie('token')
    if (token.value)
      return navigateTo('/user/overview')
  }],
})
</script>

<template>
  <div class="grid grid-cols-5 h-full">
    <div class="col-span-2 flex flex-col justify-center items-center w-64 justify-self-center">
      <TabGroup>
        <TabList class="border border-primary-200 text-2xl mb-5">
          <Tab>
            <NuxtLink v-slot="{ isActive }" to="/auth/logIn" title="Sign Up">
              <span
                class="px-4 py-2  inline-block"
                :class="{ 'bg-primary-200 text-white': isActive, 'bg-white text-primary-200': !isActive }"
              >
                Log In
              </span>
            </NuxtLink>
          </Tab>
          <Tab>
            <NuxtLink v-slot="{ isActive }" to="/auth/signUp" title="Sign Up">
              <span
                class="px-4 py-2  inline-block"
                :class="{ 'bg-primary-200 text-white': isActive, 'bg-white text-primary-200': !isActive }"
              >
                Sign Up
              </span>
            </NuxtLink>
          </Tab>
        </TabList>
      </TabGroup>
      <div class="h-1/2 w-[80%]">
        <TransitionRoot
          :show="isTransition" enter="transition-all duration-75" enter-from="-translate-x-10 opacity-0"
          enter-to="translate-x-0 opacity-100 " leave="transition-translate transition-opacity duration-150"
          leave-from="translate-all opacity-100" leave-to="translate-x-10 opacity-0"
        >
          <NuxtPage />
        </TransitionRoot>
      </div>
    </div>
    <div class="bg-primary-200 col-span-3 h-full flex flex-col justify-center px-20">
      <h1 class="text-secondary-200 font-bold text-center text-6xl">
        Money Tracker
      </h1>
      <p class="text-gray-100 mt-5 text-center">
        Your best choice for money-saving, record and analysis.
      </p>
    </div>
  </div>
</template>
