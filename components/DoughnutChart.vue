<script lang="ts" setup>
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { PropType } from 'vue'

const props = defineProps({
  chartData: {
    type: Object as PropType<IDoughnutData>,
    required: true,
  },
  title: String,
})

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const data = computed(() => {
  return {
    labels: props.chartData.category,
    datasets: [
      {
        label: 'Total',
        backgroundColor: [
          '#FF952D',
          '#A338FE',
          '#FE27A4',
        ],
        data: props.chartData.total,
      },
    ],
  }
})

const options = {
  responsive: true,
  plugins: {
    title: {
      display: Boolean(props.title),
      text: props.title,
      color: 'white',
      font: {
        size: 14,
      },
    },
    legend: {
      labels: {
        color: 'gray',
        position: 'top',
      },
    },
  },
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
