<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'

interface Props {
  title: string
  walletItem?: {
    type: string
    category: string
    date: string
    item: string
    amount: number | null
  }
}
const props = withDefaults(defineProps<Props>(), {
  walletItem: () => {
    return {
      type: 'Expense',
      category: 'Food',
      date: dayjs().format(DateEnum.dateFormat),
      item: '',
      amount: null,
    }
  },
})
const expenseTypeOption = ref(expenseCategory)
const incomeTypeOption = ref(incomeCategory)
const { dialogRef, onDialogOK, onDialogHide } = useDialogPlugin()
const localWalletItem = ref(props.walletItem)

const categoryOption = computed(() => {
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
  },
})

watch(
  () => localWalletItem.value.type,
  () => {
    localWalletItem.value.category = categoryOption.value[0]
  },
)

function confirm(data: IWalletQuery & Pick<IWalletItem, 'item' & 'amount' >) {
  onDialogOK(data)
}

function cancel() {
  onDialogHide()
}
</script>

<template>
  <BaseDialog
    v-bind="props"
    ref="dialogRef"
  >
    <template #content>
      <FormKit
        v-model="localWalletItem"
        type="form"
        :actions="false"
        @submit="confirm"
      >
        <FormKit
          type="select"
          label="Type : "
          name="type"
          :options="WalletType"
          inner-class="w-60"
        />
        <FormKit
          type="select"
          label="Category : "
          name="category"
          :options="categoryOption"
          inner-class="w-60"
        />
        <FormKit
          :value="date"
          type="baseDateRangePicker"
          label="Date :"
          name="date"
          validation="required"
          wrapper-class="$remove:items-center items-start"
          inner-class="$remove:formkit-inner w-44"
          :show-btn="false"
        />
        <FormKit
          type="text"
          label="Item : "
          name="item"
          inner-class="w-60"
          validation="required"
        />
        <FormKit
          type="text"
          label="Amount : "
          name="amount"
          inner-class="w-60"
          validation="required|number"
        />
        <div class="flex gap-2 mt-8">
          <FormKit
            type="submit"
            label="Save"
            input-class="$remove:bg-secondary-100 bg-green-700 hover:bg-green-400"
          />
          <FormKit
            type="button"
            label="Cancel"
            input-class="bg-blue-700 hover:bg-blue-400"
            @click="cancel"
          />
        </div>
      </FormKit>
    </template>
  </BaseDialog>
</template>

<style scope>
.dp-custom-menu{
  position: relative;
  top: 10px !important;
}
</style>
