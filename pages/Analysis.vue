<script lang="ts" setup>
const monthStart = dayjsTz().startOf('month').startOf('day').toDate()
const monthEnd = dayjsTz().endOf('month').startOf('day').toDate()
const query = ref({
  type: 'Expense',
  date: [monthStart, monthEnd]
})
const rateData = ref<getWalletRateAndTotalRes[]>([])
const analysisData = ref<getAnalysisDataRes | null>(null)

analysisData.value = await getAnalysisData(query.value)
rateData.value = await getWalletRateAndTotal();

watch(query.value, async () => {
  analysisData.value = await getAnalysisData(query.value)
})
</script>

<template>
  <div class="flex justify-between gap-6 flex-wrap">
    <AnalysisRateCard v-for="item of rateData" :key="item.type" :item="item" />
  </div>
  <div class="border border-secondary-100 rounded-md bg-primary-600 p-4 mb-4">
    <div class="mb-4">
      <div class="mb-4">
        <BaseSelect :list="WalletType" v-model="query.type" />
      </div>
      <div class="w-[50%]">
        <BaseDateRangePicker v-model="query.date" :show-btn="false" />
      </div>
    </div>
    <div class="card bg-primary-400 mb-6">
      <p class="text-2xl bg-primary-400 mb-4">Line Chart</p>
      <div>
        <LineChart :label="'Total'" :chartData="analysisData!.lineData" />
      </div>
    </div>
    <div class="flex flex-row mb-6 items-stretch">
      <div class="basis-[60%] card bg-primary-400 mr-4">
        <AnalysisTop5Card :items="analysisData!.top5" />
      </div>
      <div class="card bg-primary-400 basis-[40%] h-full">
        <p class="text-2xl bg-primary-400 mb-4">Doughnut Chart</p>
        <div v-if="analysisData!.doughnutData">
          <DoughnutChart :chartData="analysisData!.doughnutData" />
        </div>
        <p v-else class="text-xl text-gray-300 w-full">
          No data exists!
        </p>
      </div>
    </div>
  </div>
</template>
