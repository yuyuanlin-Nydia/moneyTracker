<script setup lang="ts">
const props = defineProps<{
  isDialogShow: Boolean
  title: String
  // fn: (page: number) => Promise<void>
//   count?: number
}>()

const emits = defineEmits(['update:isDialogShow', 'save'])

const isShow = ref<Boolean>(props.isDialogShow)

function closeDialog() {
  isShow.value = false
  emits('update:isDialogShow', isShow.value)
}
</script>

<template>
  <transition name="modal">
    <div v-if="isShow" class="modal-mask ">
      <div class="bg-primary-500 text-white w-96  flex flex-col justify-between rounded-xl p-5">
        <header class="flex justify-between items-center font-bold">
          <h3 class="text-2xl  ">
            {{ title }}
          </h3>
          <span
            class="btn hover:bg-gray-500 hover:text-white hover:rounded-xl"
            @click="closeDialog"
          >X</span>
        </header>
        <div class="my-4 overflow-y-auto">
          <slot name="content" />
        </div>
        <footer>
          <button
            class="btn w-full bg-secondary-100 text-white hover:bg-secondary-200"
            @click="emits('save')"
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
