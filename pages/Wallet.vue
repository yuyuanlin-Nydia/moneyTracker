<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const isDialogShow = ref<boolean>(false)
const query = ref<IWalletQuery>({
  type: WalletTypeEnum.Expense,
  category: ['all'],
  date: '5/7'
})
// const categoryOption = ref([
//   { value: 1, text: 'food' },
//   { value: 2, text: 'grocery' },
// ])
const walletTypeOption = ref(ToArray(WalletTypeEnum))
const expenseTypeOption = ref(ToArray(ExpenseCategoryEnum))
const incomeTypeOption = ref(ToArray(IncomeCategoryEnum))

const categoryOption = computed(()=>{
  return (query.value.type === WalletTypeEnum.Expense
    ? expenseTypeOption.value
    : incomeTypeOption.value)
})
const result = computed(() => { return 'hello' })

const searchQuery = ref({
  type: 1,
  category: 1,
  dateRange: '5/8',
})
const date = ref<any[]|null>(null)
const dateRangeTag = ['This month', 'This week', 'Today' ]

onMounted(() => {
  selectDateRange('This week')
})

function saveEdit() {
  console.log('saveEdit')
  isDialogShow.value = false
}

function openDialog(item: IWalletQuery) {
  query.value = item
  isDialogShow.value = true
}

function selectDateRange(rangeTag: string ){
  let startDate, endDate
  switch (rangeTag) {
    case 'This month':
      startDate = dayjsTz().startOf('month');
      endDate = dayjsTz().endOf('month');
      break;  
    case 'This week':
       startDate = dayjsTz().isoWeekday(1);
       endDate = dayjsTz().isoWeekday(7);
       break;
    case 'Today':
       startDate = dayjsTz();
       endDate = dayjsTz();
       break;
    default:
      break;
  }
  date.value = [startDate, endDate];
}

</script>

<template>
  <Teleport to="#modal-container">
    <Dialog
      v-if="isDialogShow"
      v-model:is-dialog-show="isDialogShow"
      title="Edit Item"
      @save="saveEdit"
    >
      <template #content>
        <div class="my-3">
          <label for="" class="inline-block w-20">Category :</label>
          <select
            v-model="query.category"
            class="input w-60"
          >
            <option
              v-for="category in categoryOption"
              :key="category.value"
              :value="category.value"
            >
              {{ category.text }}
            </option>
          </select>
        </div>
        <div class="my-3">
          <label for="" class="inline-block w-20">Date :</label>
          <input
            v-model="query.date"
            type="text"
            class="input w-60"
          >
        </div>
        <div class="my-3">
          <label for="" class="inline-block w-20">Item :</label>
          <input
            v-model="query.item"
            type="text"
            class="input w-60"
          >
        </div>
        <div class="my-3">
          <label for="" class="inline-block w-20">Amount :</label>
          <input
            :value="query.amount"
            type="text"
            class="input w-60"
          >
        </div>
      </template>
    </Dialog>
  </Teleport>
  <div class="text-lg">
    <div class="mb-2">
      <span>Type : </span>
      <select
        v-model="query.type"
        class="text-black w-56 p-1 rounded"
      >
        <option
          v-for="walletType in walletTypeOption"
          :key="walletType.value"
          :value="walletType.value"
        >
          {{ walletType.name }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <span>Category : </span>
      <div 
        class="inline mr-2" 
        v-for="category in categoryOption"
        :key="category.value">
        <input 
          class="mr-1"
          type="checkbox" 
          :value=category.value
          :id="category.name"
        > 
        <label :for="category.name">{{category.name}}</label>
      </div>
    </div>
    <div class="mb-2">
      <div class="inline-block">Date : </div>
      <div class="inline-block w-80 p-1 mr-2">
        <VueDatePicker 
          style="display: inline;"
          v-model="date"
          :enable-time-picker="false"
          range 
        />
      </div>
      <button 
        v-for="dateRange in dateRangeTag"
        :key="dateRange"
        @click="selectDateRange(dateRange)"
        class="btn border border-gray-300 text-gray-300 text-sm mr-2"
      >
        {{ dateRange }}
      </button>
    </div>
  </div>

  <div class="border-b border-gray-500">
      <button class="btn bg-secondary-100 text-white my-4">
        Search
      </button>
  </div>
  <br>
  <ul>
    <li class="bg-primary-100 rounded-lg p-3 mb-3">
      <div class="text-xl font-bold mb-2">
        <Icon name="ic:sharp-plus" class="inline-block align-middle bg-secondary-100 rounded text-2xl mr-2" />
        <span>Food $568</span>
      </div>
      <ul class="pl-8 text-md">
        <li class="flex justify-between bg-primary-500 p-2 border-b border-secondary-100">
          <div>5/20 Guava</div>
          <div>
            <span class="mx-2 text-blue-400">+120</span>
            <Icon
              name="material-symbols:edit"
              class="align-text-top cursor-pointer text-white bg-secondary-100 rounded-full p-1 text-xl"
              @click="openDialog({ category: 2, date: '5 / 20', item: 'Guava', amount: 120 })"
            />
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
