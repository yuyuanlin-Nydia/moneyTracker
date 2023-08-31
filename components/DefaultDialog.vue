<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string
  content: string
  okText?: string
  data?: Record<string, any>
}>(), { okText: 'Save' })

const { dialogRef, onDialogOK, onDialogHide } = useDialogPlugin()

function confirm() {
  onDialogOK({ ...props.data })
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
      {{ props.content }}
      <div class="mt-4">
        <button
          type="button"
          class="btn mr-4 text-white "
          :class="okText === 'Save' ? 'bg-green-600 hover:bg-green-400' : 'bg-red-600 :hover:bg-red-400'"
          @click="confirm"
        >
          {{ okText }}
        </button>
        <button
          type="button"
          class="btn bg-blue-600 text-white hover:bg-blue-400"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </template>
  </BaseDialog>
</template>
