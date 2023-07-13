<script lang="ts" setup>
const latestWallet: getLatestWalletRes = await getLatestWallet()
const type = ref<string>('Expense')
const walletTotalAmount = ref<getWalletTotalAmountResObj[]>([])
const chartData = ref<getWalletAnalysisRes | null>(null)

watch(type, async (newValue) => {
  chartData.value = await getWalletAnalysis(newValue)
})

chartData.value = await getWalletAnalysis(type.value)
walletTotalAmount.value = await getWalletTotalAmount()
</script>

<template>
  <div class="w-full flex flex-row gap-6 mb-4">
    <div class="flex flex-col basis-3/4 ">
      <div class="card w-full bg-primary-100 dark:bg-primary-500">
        <!-- Analysis -->
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold">
            Analysis
          </div>
          <NuxtLink to="/user/analysis" class="btn-primary justify-self-end w-36 my-2">
            More Analysis
          </NuxtLink>
        </div>
        <!-- Report -->
        <div class="grid grid-cols-5">
          <!-- Chart -->
          <div class="col-span-3 flex justify-center">
            <div v-if="chartData" class="sm:w-[100%] md:w-[70%]">
              <DoughnutChart title="Doughnut Chart For This Month" :chart-data="chartData" />
            </div>
            <p v-else class="text-xl dark:text-gray-300 center w-full">
              No data exists!
            </p>
          </div>
          <div class="flex flex-col col-span-2">
            <div class="mb-4">
              <BaseSelect v-model="type" :list="WalletType" :custom-class="['w-full']" />
            </div>
            <div v-for="item in walletTotalAmount" :key="item._id" class="center p-2 text-gray-300 bg-primary-200 dark:bg-info-500 rounded-xl mb-3">
              <icon
                class="text-5xl font-extrabold mr-3 text-secondary-100"
                :name="item._id === 'Income' ? 'ic:sharp-plus' : 'ic:sharp-minus'"
              />
              <div>
                <span class="font-extrabold block text-lg">${{ item.total.toLocaleString() }}</span>
                <span class="details">Total {{ item._id }} / this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Income and Expense -->
      <div class="center w-full mt-3 grid grid-cols-2 gap-5">
        <OverviewLatestWalletCard title="Latest Income" :list="latestWallet.income" />
        <OverviewLatestWalletCard title="Latest Expense" :list="latestWallet.expense" />
      </div>
    </div>
    <div class="bg-primary-100  dark:bg-primary-500 relative rounded-xl flex justify-center">
      <div class="sticky animate-bounce hover:animate-none top-[45%] h-32 w-[80%]">
        <div class="relative bg-primary-200 rounded-md p-4 flex justify-end flex-col sm:pt-8 md:pt-16">
          <img src="/upgrade.png" class="sm:w-[5rem] md:w-[7rem] block absolute left-[50%] translate-x-[-50%] top-[-30%]" alt="upgrade">
          <p class="text-gray-300 text-center mb-3">
            Unlock more features using
            <span class="font-bold text-lg">Pro</span>
          </p>
          <NuxtLink to="/productPlan">
            <button class="btn-primary w-full">
              Upgrade
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
