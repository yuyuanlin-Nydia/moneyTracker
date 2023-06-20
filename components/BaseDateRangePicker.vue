<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Dayjs } from "dayjs"

const props = withDefaults(defineProps<{
  modelValue: Dayjs[],
  showBtn?: boolean
}>(), {
  showBtn: true
})
const emits = defineEmits(['update:modelValue', 'update:clickBtn'])
defineExpose({ 
  selectDateRange
})
const dateRangeTextBtn = ref<string>('')

const date = computed({
  get(){
    return props.modelValue
  },
  set(newValue){
    emits('update:modelValue', newValue)
  } 
})
const dateRangeTag = ['This month', 'This week', 'Today' ]

selectDateRange('This month')

function selectDateRange(rangeTag: string ){
  dateRangeTextBtn.value = rangeTag
  let startDate = dayjsTz().startOf('month').startOf('day'), 
      endDate = dayjsTz().endOf('month').startOf('day')
  switch (rangeTag) {
    case 'This month':
      startDate = dayjsTz().startOf('month').startOf('day');
      endDate = dayjsTz().endOf('month').startOf('day');
      break;
    case 'This week':
       startDate = dayjsTz().isoWeekday(1).startOf('day');
       endDate = dayjsTz().isoWeekday(7).startOf('day');
       break;
    case 'Today':
       startDate = dayjsTz().startOf('day');
       endDate = dayjsTz().startOf('day');
       break;
    default:
      break;
  }
  date.value = [startDate, endDate];
  emits('update:modelValue', [startDate, endDate])
}
</script>

<template>
  <vue-date-picker
    ref="datePicker"
    auto-apply
    format="yyyy-MM-dd"
    v-model="date"
    :enable-time-picker="false"
    range 
    @update:model-value="dateRangeTextBtn=''"
   />
  <div class="mt-4" v-if="showBtn">
     <button 
       v-for="dateRange in dateRangeTag"
       :key="dateRange"
       @click="selectDateRange(dateRange)"
       :class="['btn', 'border', 'text-sm mr-2', 
                dateRangeTextBtn===dateRange
                ? 'border-gray-100 text-gray-100'
                : 'border-gray-400 text-gray-400']"
     >
       {{ dateRange }}
     </button>
  </div>
</template>