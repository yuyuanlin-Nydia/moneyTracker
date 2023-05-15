<script lang="ts" setup>
// definePageMeta({
//   middleware: ['auth'],
// })
</script>

<template>
  <div class=" w-full flex justify-around flex-col">
    <div class="card w-full bg-primary-500">
      <h3 class="text-2xl font-bold">
        Reports
      </h3>
      <!-- Report -->
      <div class="grid grid-cols-5">
        <div class="col-span-3">
          chart
        </div>
        <div class="flex flex-col justify-end col-span-2">
          <!-- <ul>
            <li class="uppercase">
              FOOD: $555
            </li>
            <li class="uppercase">
              GROCERY: $555
            </li>
            <li class="uppercase">
              ENTERTAINMENT: $555
            </li>
          </ul> -->
          <button class="btn justify-self-end w-36 bg-secondary-100 my-2 ">
            More Details
          </button>
          <div class="center p-2 bg-info-500 rounded-xl">
            <icon class="text-5xl font-extrabold mr-3 text-secondary-100" name="ic:sharp-plus" />
            <div>
              <span class="font-extrabold block text-lg">$540</span>
              <span class="details">Total Income / period</span>
            </div>
          </div>
          <div class="center p-2 bg-info-500 rounded-xl mt-3">
            <icon class="text-5xl font-extrabold mr-3 text-secondary-100" name="ic:sharp-minus" />
            <div>
              <span class="font-extrabold block text-lg">$540</span>
              <span class="details">Total Expense / period</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Income and expense -->
    <div class="center w-full mt-3 grid grid-cols-2 gap-5">
      <div class="card bg-primary-500 w-full">
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-2xl font-bold">
            Income
          </h3>
          <button class="btn text-gray-400 hover:bg-secondary-100 hover:text-white">
            View All
          </button>
        </div>

        <ul>
          <li class="flex justify-between items-center border-b border-secondary-100 py-1">
            <div>
              <span class="text-sm block font-bold">KKBOX</span>
              <span class="details leading-3">Category</span>
            </div>
            <span class="font-bold">$200</span>
          </li>
          <li class="flex justify-between items-center border-b border-secondary-100 py-1">
            <div>
              <span class="text-sm block font-bold ">KKBOX</span>
              <span class="details leading-3">Category</span>
            </div>
            <span class="font-bold">$200</span>
          </li>
          <li class="flex justify-between items-center pt-3">
            <div>
              <span class="text-sm block font-bold">KKBOX</span>
              <span class="details leading-3">Category</span>
            </div>
            <span class="font-bold">$200</span>
          </li>
        </ul>
      </div>
      <div class="card bg-primary-500 w-full">
        <h3 class="text-2xl font-bold">
          Expense
        </h3>
      </div>
      <div class="card bg-primary-500 w-full">
        <h3 class="text-2xl font-bold">
          Budget
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
