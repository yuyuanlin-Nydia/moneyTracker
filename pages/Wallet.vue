<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import DefaultDialog from '~/components/DefaultDialog.vue';
import WalletDialog from '~/components/WalletDialog.vue';

const { $dialog, $toast } = useNuxtApp();
const walletTypeOption = ref(WalletType)
const expenseTypeOption = ref(expenseCategory)
const incomeTypeOption = ref(incomeCategory)
const query = ref<IWalletQuery>({
  type: 'Expense',
  category: expenseTypeOption.value,
  date: []
})
const dateRangeTag = ['This month', 'This week', 'Today' ]
const walletList = ref<getWalletRes[]>([]);
const loading = ref<boolean>(false)
const drag = ref<boolean>(false)

const categoryOption = computed(()=>{
  return (query.value.type === "Expense"
    ? expenseTypeOption.value
    : incomeTypeOption.value)
})

selectDateRange('This week')
await fetchWallet()

async function fetchWallet(){
  try{
    // to keep the category order the same all the time
    const formatQuery = {...query.value, category: query.value.category.sort() }
    const result = await getWallet(formatQuery)
    walletList.value = result
    loading.value = true;
  } catch(err) {
    console.error(err)
  }finally{
    loading.value = false;
  }
}

function itemDateFormat(date:string){
  return dayjsTz(date).format(DateEnum.dateFormat)
}

async function dragEnd(){
  drag.value = false
  const newDragList: Pick<IWalletItem,'_id' | 'category'>[] = walletList.value.map((categoryItem)=>{
    return categoryItem.list.map(item=>{
      return {
        _id: item._id,
        category: categoryItem._id
      }
    })
  }).flat()

  await editSingleWalletCategory(newDragList);
  await fetchWallet()

  $toast.success('Edit category successfully!')
}

function selectDateRange(rangeTag: string ){
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
  query.value.date = [startDate, endDate];
}

function amountHTML(item: IWalletItem){
  return item.type === 'Expense'
  ? `<span class="mx-2 text-red-400">-${item.amount.toLocaleString()}</span>`
  : `<span class="mx-2 text-blue-400">+${item.amount.toLocaleString()}</span>`
}

// Add Dialog
function openAddDialog() {
  $dialog
    .open( 
      WalletDialog, {
        title: 'Add',
      }
    )
    .onOk(async (data)=>{
      await addSingleWallet(data);
      await fetchWallet()
      $toast.success('Add successfully!')
    })
}

// Edit Dialog
function openEditDialog(walletItem: IWalletItem) {
  $dialog
    .open( 
      WalletDialog, {
        title: 'Edit',
        walletItem: {...walletItem},
      }
    )
    .onOk(async (data)=>{
      await editSingleWallet(data);
      walletList.value = await getWallet(query.value)
      $toast.success('Edit successfully!')
    })
}

// Delete Dialog
function openDeleteDialog(data: IWalletItem) {
  $dialog
  .open(DefaultDialog,{
    title: 'Confirmation',
    okText: 'Delete',
    content: `Are you sure to delete item-${data.item}?`,
    data
  })
  .onOk(async (data)=>{
    await deleteSingleWallet(data._id);
    await fetchWallet()
    $toast.success('Delete successfully!')
  })
}
</script>

<template>
  <div class="flex gap-4 border-b border-gray-500">
    <div>
      <div class="text-lg">
        <div class="mb-2">
            <span class="inline-block w-24">Type : </span>
            <select
              v-model.number="query.type"
              class="text-black w-56 p-1 rounded"
            >
              <option
                v-for="walletType in walletTypeOption"
                :key="walletType"
                :value="walletType"
              >
                {{ walletType }}
              </option>
            </select>
        </div>
        <div class="mb-2">
            <span class="inline-block w-24">Category : </span>
            <div 
              class="inline mr-2" 
              v-for="category in categoryOption"
              :key="category">
              <input 
                class="mr-1"
                type="checkbox" 
                :value=category
                :id="category"
                checked
                v-model="query.category"
              > 
              <label :for="category">{{category}}</label>
            </div>
        </div>
        <div class="mb-2">
            <span class="inline-block w-24">Date : </span>
            <div class="inline-block w-80 p-1 mr-2">
              <vue-date-picker
                auto-apply
                format="yyyy-MM-dd"
                v-model="query.date"
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
      <div>
        <button 
          @click="fetchWallet"
          class="btn-primary my-4"
        >
          Search
        </button>
      </div>
    </div>
    <div>
      <button
        class="block w-52 btn-primary my-3 text-left"
        @click="openAddDialog"
      >
        <Icon name="material-symbols:add-circle-outline" class="inline-block align-middle rounded text-3xl mr-2" />
        Add wallet
      </button>
      <button 
        class="block w-52 btn-primary my-3 text-left"
      >
        <Icon name="material-symbols:delete" class="inline-block align-middle rounded text-3xl mr-2" />
        Multiple delete
      </button>
    </div>
  </div>
  <br>
  <div 
    class="h-1/3 relative"
    v-if="loading"
  >
    <Loading :show=loading />
  </div>
  <div v-else-if="walletList.length">
    <ul>
      <li 
        v-for="{list, _id, total} in walletList"
        :key="_id"
        class="bg-primary-100 rounded-lg p-3 mb-3"
      >
        <div class="text-xl font-bold mb-2">
          <Icon name="ic:sharp-plus" class="inline-block align-middle bg-secondary-100 rounded text-2xl mr-2" />
          <span>{{ _id }} ${{total.toLocaleString()}}</span>
        </div>
        <draggable
          :list="list"
          itemKey="_id"
          :sort="false"
          ghost-class="ghost"
          chosen-class="drag-chosen"
          animation="300"
          @start="drag = true"
          @end="dragEnd"
          tag="ul"
          group="wallet"
          handle=".moveIcon"
        >
            <template #item="{ element }">
          <li 
            class="flex justify-between bg-primary-500 p-2 border-b border-secondary-100">
            <div>
                <Icon
                  name="material-symbols:drag-indicator" 
                  class="moveIcon align-text-top cursor-pointer text-white rounded-full p-1 text-xl" 
                />          
                {{itemDateFormat(element.date)}} {{element.item}}
            </div>
            
            <div>
              <div class="inline-block" v-html="amountHTML(element)"></div>
              <Icon
                name="material-symbols:edit"
                class="align-text-top cursor-pointer text-white bg-secondary-100 rounded-full p-1 text-xl mr-1.5"
                @click="openEditDialog(element)"
              />
              <Icon
                name="material-symbols:delete"
                class="align-text-top cursor-pointer text-white bg-secondary-100 rounded-full p-1 text-xl"
                @click="openDeleteDialog(element)"
              />
            </div>
          </li>
          </template>
        </draggable>
      </li>
    </ul>
  </div>
</template>