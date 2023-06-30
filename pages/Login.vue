<script setup lang="ts">
const user = useUser()
const query = ref<loginReq>({
  account: 'rdtest1153',
  password: 'rdtest1153'
})

definePageMeta({
  layout: 'plain'
})
</script>

<template>
  <div class="grid grid-cols-5 h-full">
    <div class="col-span-2 flex flex-col justify-center items-center w-64 justify-self-center">
      <form class="w-full" @submit.prevent="user.login(query)">
        <h1 class="text-4xl text-primary-100 text-center">
          Login
        </h1>
        <label class="block w-full mt-8">
          Account
          <input class="block bg-gray-100 py-1 px-2 border border-primary rounded w-full" type="text"
            v-model="query.account">
        </label>
        <label class="block mt-3">
          Password
          <input class="block bg-gray-100 py-1 px-2 border border-primary rounded w-full" type="password"
            v-model="query.password">
        </label>
        <button class="btn mt-8 bg-secondary-100 text-white w-full">
          Send
        </button>
      </form>
    </div>
    <div class="bg-primary-100 col-span-3 h-full flex flex-col justify-center px-20">
      <h1 class="text-secondary-200 font-bold text-center text-6xl">
        Money Tracker
      </h1>
      <pre class="text-gray-100 mt-5 text-center">Your best choice for money-saving and budget.</pre>
    </div>
  </div>
</template>
