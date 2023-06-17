<script lang="ts" setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend, Title)

const props = defineProps({
  chartData: null,
  title: {
    type:String,
    required: true
  }
})

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: props.title,
      color: 'white',
      font:{
        size: 14
      }
    },
    legend: {
      labels: {
        color: "lightgray", 
      }
    }
  }
}
</script>

<template>
  <Doughnut :data="chartData" :options="options" />
</template>