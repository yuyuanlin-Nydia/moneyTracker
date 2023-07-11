<script setup lang="ts">
const user = useUser()
const query = ref<logInReq>({
  account: 'rdtest1153',
  password: 'rdtest1153',
})
</script>

<template>
  <form class="w-full" @submit.prevent="user.logIn(query)">
    <label class="block w-full mt-6">
      Account
      <input v-model="query.account" class="authInput" type="text">
    </label>
    <label class="block mt-3">
      Password
      <input v-model="query.password" class="authInput" type="password">
    </label>
    <button class="btn mt-8 bg-secondary-100 text-white w-full">
      Log in
    </button>
  </form>
</template>
