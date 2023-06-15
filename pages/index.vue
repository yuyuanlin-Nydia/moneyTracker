<script lang="ts" setup>
const latestWallet: getLatestWalletRes = await getLatestWallet()
const walletTotalAmount: getWalletTotalAmountResObj[] = await getWalletTotalAmount()
// definePageMeta({
//   middleware: ['auth'],
// })
</script>

<template>
  <div class="w-full flex flex-col">
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
          <button class="btn-primary justify-self-end w-36 my-2 ">
            More Details
          </button>
          <div class="center p-2 bg-info-500 rounded-xl">
            <icon class="text-5xl font-extrabold mr-3 text-secondary-100" name="ic:sharp-plus" />
            <div>
              <span class="font-extrabold block text-lg">${{walletTotalAmount[0].total.toLocaleString()}}</span>
              <span class="details">Total Income / month</span>
            </div>
          </div>
          <div class="center p-2 bg-info-500 rounded-xl mt-3">
            <icon class="text-5xl font-extrabold mr-3 text-secondary-100" name="ic:sharp-minus" />
            <div>
              <span class="font-extrabold block text-lg">${{walletTotalAmount[1].total.toLocaleString()}}</span>
              <span class="details">Total Expense / month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Income and Expense -->
    <div class="center w-full mt-3 grid grid-cols-2 gap-5">
      <OverviewLatestWalletCard 
        :title="'Income'"
        :list="latestWallet.income"
      />
      <OverviewLatestWalletCard 
        :title="'Expense'"
        :list="latestWallet.expense"
      />
    </div>
  </div>
</template>