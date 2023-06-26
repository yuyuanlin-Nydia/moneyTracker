<script lang="ts" setup>
import type { PropType } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  chartData: {
    type: Object as PropType<ILineDataObj>,
    required: true
  },
  label: String
})

const data = computed(() => {
  return {
    labels: props.chartData.label,
    datasets: [
      {
        label: props.label,
        backgroundColor: '#F59B33',
        data: props.chartData.total,
        borderColor: 'lightGray',
        borderWidth: 2
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#F59B33",
      }
    },
  },
  scales: {
    x: {
      ticks: { color: "white" },
      grid: { color: '#a1a1a1' }
    },
    y: {
      ticks: { color: "white" },
      grid: { color: '#a1a1a1' }
    }
  }
}
</script>

<template>
  <Line :data="data" :options="options" />
</template>

