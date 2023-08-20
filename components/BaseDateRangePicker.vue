<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { FormKitFrameworkContext } from '@formkit/core'

type IBtnText = 'This month' | 'This week' | 'Today'

const props = withDefaults(defineProps<{
  showBtn?: boolean
  btnToShow?: IBtnText[]
  context: FormKitFrameworkContext
}>(), {
  showBtn: true,
  btnToShow: () => ['This month', 'This week', 'Today'],
})
const emits = defineEmits(['update:modelValue'])
defineExpose({
  selectDateRange,
})
const dateRangeTextBtn = ref<string>('')

const date = computed({
  get() {
    return props.context._value
  },
  set(newValue) {
    emits('update:modelValue', newValue)
  },
})

function selectDateRange(rangeTag: string) {
  dateRangeTextBtn.value = rangeTag
  let startDate = dayjsTz().startOf('month').startOf('day').toDate()
  let endDate = dayjsTz().endOf('month').startOf('day').toDate()
  switch (rangeTag) {
    case 'This month':
      startDate = dayjsTz().startOf('month').startOf('day').toDate()
      endDate = dayjsTz().endOf('month').startOf('day').toDate()
      break
    case 'This week':
      startDate = dayjsTz().isoWeekday(1).startOf('day').toDate()
      endDate = dayjsTz().isoWeekday(7).startOf('day').toDate()
      break
    case 'Today':
      startDate = dayjsTz().startOf('day').toDate()
      endDate = dayjsTz().startOf('day').toDate()
      break
    default:
      break
  }
  date.value = [startDate, endDate]
  emits('update:modelValue', props.context.node.input([startDate, endDate]))
}
</script>

<template>
  <div>
    <VueDatePicker
      v-bind="context.attrs" :id="context.id" :model-value="date" auto-apply format="yyyy-MM-dd" :enable-time-picker="false"
      range :name="context.node.name" :disabled="context.disabled" class="baseDateRangePicker" :class="[...context.classes.input]" @update:model-value="context.node.input($event);dateRangeTextBtn = ''"
      @blur="context.handlers.blurs"
    />
    <div v-if="showBtn" class="mt-4">
      <button
        v-for="dateRange in btnToShow" :key="dateRange" class="btn border text-sm mr-2" :class="[dateRangeTextBtn === dateRange
          ? 'border-primary-200 dark:border-gray-100 text-primary-200 dark:text-gray-100'
          : 'border-primary-100 dark:border-gray-400 text-primary-100 dark:text-gray-400']" @click.prevent="selectDateRange(dateRange)"
      >
        {{ dateRange }}
      </button>
    </div>
  </div>
</template>

<style>
.formkit-input .multiselect {
  padding: 0
}
</style>
