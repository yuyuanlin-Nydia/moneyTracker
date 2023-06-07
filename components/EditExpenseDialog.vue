<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  title: string,
  walletItem: IWalletItem
}>()
const walletTypeOption = ToArray(WalletTypeEnum)
const expenseTypeOption = ref(expenseCategory)
const incomeTypeOption = ref(incomeCategory)
const { dialogRef, onDialogOK, onDialogHide } = useDialogPlugin();
const localWalletItem = ref(props.walletItem)
const categoryOption = computed(()=>{
  return (localWalletItem.value.type === 'Expense'
    ? expenseTypeOption.value
    : incomeTypeOption.value)
})
const date = computed({
  get() { 
    return dayjsTz(localWalletItem.value.date).format(DateEnum.dateFormat) 
  },
  set(newValue) {
    localWalletItem.value.date = dayjsTz(newValue).format(DateEnum.dateFormat) 
  }
})

watch(
  () => localWalletItem.value.type, 
  () => {
    localWalletItem.value.category = categoryOption.value[0]
  }
)

function confirm(){
  onDialogOK({...localWalletItem.value})
}

function cancel(){
  onDialogHide()
}
</script>

<template>
  <BaseDialog
    v-bind="props"
    ref="dialogRef"
    @confirm="confirm"
    @cancel="cancel"
  >
    <template #content>
      <div class="my-3">
        <label for="" class="inline-block w-20">Type :</label>
        <select
          v-model="localWalletItem.type"
          class="input w-60"
        >
          <option
            v-for="walletType in walletTypeOption"
            :key="walletType.name"
            :value="walletType.name"
          >
            {{ walletType.name }}
          </option>
        </select>
      </div>
      <div class="my-3">
        <label for="" class="inline-block w-20">Category :</label>
        <select
          v-model="localWalletItem.category"
          class="input w-60"
        >
          <option
            v-for="category in categoryOption"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="my-3">
        <label for="" class="inline-block w-20 ">Date :</label>
        <div class="inline-block align-text-top w-60">
          <vue-date-picker
            auto-apply
            format="yyyy-MM-dd"
            menu-class-name="dp-custom-menu"
            position="left"
            v-model="date"
            :enable-time-picker="false"
          />
        </div>
      </div>
      <div class="my-3">
        <label for="" class="inline-block w-20">Item :</label>
        <input
          v-model="localWalletItem.item"
          type="text"
          class="input w-60"
        >
      </div>
      <div class="my-3">
        <label for="" class="inline-block w-20">Amount :</label>
        <input
          v-model="localWalletItem.amount"
          type="text"
          class="input w-60"
        >
      </div>
    </template>
  </BaseDialog>
</template>

<style scope>
.dp-custom-menu{
  position: relative;
  top: 10px !important;
}
</style>