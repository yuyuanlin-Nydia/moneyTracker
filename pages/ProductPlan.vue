<script setup lang="ts">
useHead({
  title: 'Product Plan',
  meta: [
    { name: 'description', content: 'Your best choice for money-saving, record and analysis.' },
    { property: 'og:description', content: 'Your best choice for money-saving, record and analysis.' },
    { property: 'og:image', content: 'Your best choice for money-saving, record and analysis.' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <div class="flex items-center flex-col py-6">
    <p class="text-4xl font-bold mb-3">
      Product Plan
    </p>
    <table class="text-2xl w-full lg:w-9/12 text-center">
      <thead class="text-3xl text-primary-200 border-b-2 border-secondary-100">
        <tr>
          <td />
          <td>Free</td>
          <td>Premium</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Target</td>
          <td>Newbie </td>
          <td>Expert</td>
        </tr>
        <tr>
          <td>Price</td>
          <td><b class="text-4xl">NT$0</b> /month</td>
          <td><b class="text-4xl">NT$50</b> /month</td>
        </tr>
        <tr>
          <td>Dark/Light Mode</td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
        </tr>
        <tr>
          <td>Category </td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
        </tr>
        <tr>
          <td>Analysis Report</td>
          <td>
            <Icon name="material-symbols:cancel" class="text-4xl text-secondary-100 opacity-40" />
          </td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
        </tr>
        <tr>
          <td>Experience Latest Feature</td>
          <td>
            <Icon name="material-symbols:cancel" class="text-4xl text-secondary-100 opacity-40" />
          </td>
          <td>
            <Icon name="material-symbols:check-circle" class="text-4xl text-secondary-100" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
table {
  tbody {
    td:nth-child(1) {
      text-align: left;
    }
  }

  td {
    padding: 2%;
  }
}
</style>
