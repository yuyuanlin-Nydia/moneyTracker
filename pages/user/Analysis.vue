<script lang="ts" setup>
const monthStart = dayjsTz().startOf('month').startOf('day').toDate()
const monthEnd = dayjsTz().endOf('month').startOf('day').toDate()
const query = ref({
  type: 'Expense',
  date: [monthStart, monthEnd],
})
const rateData = ref<getWalletRateAndTotalRes[]>([])
const analysisData = ref<getAnalysisDataRes | null>(null)

analysisData.value = await getAnalysisData(query.value)
rateData.value = await getWalletRateAndTotal()

watch(query.value, async () => {
  analysisData.value = await getAnalysisData(query.value)
})
</script>

<template>
  <div class="flex justify-between gap-6 flex-wrap">
    <AnalysisRateCard v-for="item of rateData" :key="item.type" :item="item" />
  </div>
  <div class="border border-secondary-100 rounded-md bg-primary-100 dark:bg-primary-600 p-4 mb-4">
    <FormKit
      id="type"
      v-model="query.type"
      type="select"
      name="type"
      :options="WalletType"
      inner-class="bg-white w-32"
      validation="required"
    />
    <FormKit
      v-model="query.date"
      type="baseDateRangePicker"
      name="date"
      validation="required"
      wrapper-class="w-[50%]"
      outer-class="$reset mb-4"
      inner-class="$remove:formkit-inner"
      :is-range="true"
      :show-btn="false"
    />
    <div class="card bg-primary-200 dark:bg-primary-400 mb-6">
      <p class="text-2xl text-gray-200 mb-4">
        Line Chart
      </p>
      <div>
        <LineChart label="Total" :chart-data="analysisData!.lineData" />
      </div>
    </div>
    <div class="flex flex-row mb-6 items-stretch">
      <div class="basis-[60%] card bg-primary-200 dark:bg-primary-400 mr-4">
        <AnalysisTop5Card :items="analysisData!.top5" />
      </div>
      <div class="card bg-primary-200 dark:bg-primary-400 basis-[40%] h-full">
        <p class="text-2xl mb-4 text-white">
          Doughnut Chart
        </p>
        <div v-if="analysisData!.doughnutData">
          <DoughnutChart :chart-data="analysisData!.doughnutData" />
        </div>
        <p v-else class="text-xl text-gray-300 w-full">
          No data exists!
        </p>
      </div>
    </div>
  </div>
</template>
