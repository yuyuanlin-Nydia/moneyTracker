<script lang="ts" setup>
const props= defineProps<{
  title:string,
  content:string,
  okText?:string
}>()
const {dialogRef,onDialogOK, onDialogHide} = useDialogPlugin();

function confirm(){
  onDialogOK()
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
      {{props.content}}
    </template>
  </BaseDialog>
</template>