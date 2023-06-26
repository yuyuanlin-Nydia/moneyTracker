<script lang="ts" setup>
const latestWallet: getLatestWalletRes = await getLatestWallet()
const type = ref<string>("Expense")
const walletTotalAmount = ref<getWalletTotalAmountResObj[]>([])
const chartData = ref<getWalletAnalysisRes | null>(null)

watch(type, async (newValue) => {
  chartData.value = await getWalletAnalysis(newValue)
})

chartData.value = await getWalletAnalysis(type.value)
walletTotalAmount.value = await getWalletTotalAmount()

// definePageMeta({
//   middleware: ['auth'],
// })
</script>

<template>
  <div class="w-full flex flex-row gap-6 mb-4">
    <div class="flex flex-col basis-3/4 ">
      <div class="card w-full bg-primary-500">
        <!-- Analysis -->
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold">
            Analysis
          </div>
          <NuxtLink to="/analysis" class="btn-primary justify-self-end w-36 my-2">
            More Analysis
          </NuxtLink>
        </div>
        <!-- Report -->
        <div class="grid grid-cols-5">
          <!-- Chart -->
          <div class="col-span-3 flex justify-center">
            <div class="sm:w-[100%] md:w-[70%]" v-if="chartData">
              <DoughnutChart :title="'Doughnut Chart For This Month'" :chartData="chartData" />
            </div>
            <p v-else class="text-xl text-gray-300 center w-full">
              No data exists!
            </p>
          </div>
          <div class="flex flex-col col-span-2">
            <div class="mb-4">
              <BaseSelect :list="WalletType" v-model="type" :customClass="['w-full']" />
            </div>
            <div class="center p-2 bg-info-500 rounded-xl mb-3" v-for="item in walletTotalAmount" :key="item.type">
              <icon class="text-5xl font-extrabold mr-3 text-secondary-100" name="ic:sharp-plus" />
              <div>
                <span class="font-extrabold block text-lg">${{ item.total.toLocaleString() }}</span>
                <span class="details">Total {{ item.type }} / this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Income and Expense -->
      <div class="center w-full mt-3 grid grid-cols-2 gap-5">
        <OverviewLatestWalletCard :title="'Income'" :list="latestWallet.income" />
        <OverviewLatestWalletCard :title="'Expense'" :list="latestWallet.expense" />
      </div>
    </div>
    <div class="flex-col-8 basis-1/4 bg-primary-500 card">
      <div class="fixed animate-bounce hover:animate-none top-[40%] h-40 w-[18%]">
        <div class="relative bg-primary-700 rounded-md p-4 flex justify-end flex-col h-48">
          <img src="/upgrade.png" class="w-[65%] block absolute left-[50%] translate-x-[-50%] top-[-50%]" alt="upgrade">
          <p class="text-gray-300 text-center mb-3">Unlock more features using
            <span class="font-bold text-lg">Pro</span>
          </p>
          <NuxtLink to="/upgrade">
            <button class="btn-primary w-full">Upgrade</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>