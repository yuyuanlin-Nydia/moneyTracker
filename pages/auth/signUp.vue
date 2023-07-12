<script setup lang="ts">
useHead({
  title: 'Sign Up',
})
const user = useUser()
const query = ref<signUpReq>({
  userName: '',
  account: '',
  password: '',
})
</script>

<template>
  <form class="w-full" @submit.prevent="user.signUp(query)">
    <label class="block w-full mt-6">
      User Name
      <input v-model="query.userName" class="authInput" type="text">
    </label>
    <label class="block w-full mt-3">
      Account
      <input v-model="query.account" class="authInput" type="text">
    </label>
    <label class="block mt-3">
      Password
      <input v-model="query.password" class="authInput" type="password">
    </label>
    <button class="btn mt-8 bg-secondary-100 text-white w-full">
      Sign up
    </button>
  </form>
</template>
