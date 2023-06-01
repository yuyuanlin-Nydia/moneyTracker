<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import DefaultDialog from '~/components/DefaultDialog.vue';
import EditExpenseDialog from '~/components/EditExpenseDialog.vue';

const { $dialog, $toast } = useNuxtApp();
const query = ref<IWalletQuery>({
  type: WalletTypeEnum.Expense,
  category: ['all'],
  date: '5/7'
})
const walletTypeOption = ref(ToArray(WalletTypeEnum))
const expenseTypeOption = ref(ToArray(ExpenseCategoryEnum))
const incomeTypeOption = ref(ToArray(IncomeCategoryEnum))
const categoryOption = computed(()=>{
  return (query.value.type === WalletTypeEnum.Expense
    ? expenseTypeOption.value
    : incomeTypeOption.value)
})
const date = ref<any[]|null>(null)
const dateRangeTag = ['This month', 'This week', 'Today' ]
onMounted(() => {
  selectDateRange('This week')
})

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

// Edit Dialog
function openEditDialog(walletItem: IWalletItem) {
  $dialog
    .open( 
      EditExpenseDialog,{
        title: 'Edit',
        walletItem,
        categoryOption:categoryOption.value
      }
    )
    .onOk(()=>{
      $toast.success('Edit successfully!')
    })
}

// Delete Dialog
function openDeleteDialog(data: IWalletItem) {
  $dialog
  .open(DefaultDialog,{
    title: 'Confirmation',
    okText: 'Delete',
    content: `Are you sure to delete item-${data.item}?`
  })
  .onOk(()=>{
      $toast.success('Delete successfully!')
  })
}
</script>

<template>
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
        <vue-date-picker
          auto-apply
          format="yyyy-MM-dd"
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
              class="align-text-top cursor-pointer text-white bg-secondary-100 rounded-full p-1 text-xl mr-1.5"
              @click="openEditDialog({type:1, category:2, item:'Guava', amount:150, date: '2023/5/21'})"
            />
            <Icon
              name="material-symbols:delete"
              class="align-text-top cursor-pointer text-white bg-secondary-100 rounded-full p-1 text-xl"
              @click="openDeleteDialog({type:1, category:2, item:'Guava', amount:150, date: '2023/5/21'})"
            />
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
