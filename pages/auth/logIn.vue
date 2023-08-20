<script setup lang="ts">
useHead({
  title: 'Log In',
})
const user = useUserStore()
</script>

<template>
  <FormKit
    type="form"
    submit-label="Log in"
    :submit-attrs="{
      inputClass: 'w-full mt-6',
    }"
    @submit="user.logIn"
  >
    <FormKit
      type="text"
      name="account"
      label="Account"
      wrapper-class="$reset block"
      input-class="$reset authInput"
      inner-class="$reset"
      label-class="mt-3 mb-1"
      validation="required|alphanumeric|length:6,16"
      value="rdtest1153"
    />
    <FormKit
      type="password"
      name="password"
      label="Password"
      wrapper-class="$reset block"
      input-class="$reset authInput"
      inner-class="$reset"
      label-class="mb-1"
      validation="required|alphanumeric|length:6,16"
      value="rdtest1153"
    />
  </FormKit>
</template>
