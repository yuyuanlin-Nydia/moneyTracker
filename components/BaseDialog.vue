<script lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

export default defineComponent({
  name: 'BaseDialog',
  components: { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['cancel', 'confirm'],
  setup(props) {
    const { proxy } = getCurrentInstance()!
    const isShow = ref(true)

    function hide() {
      isShow.value = false
    }
    function show() {
      isShow.value = true
    }

    Object.assign(proxy!, { show, hide })

    return {
      props,
      isShow,
      hide,
    }
  },
})
</script>

<template>
  <TransitionRoot appear :show="isShow" as="template">
    <Dialog as="div" class="relative z-10" @close="hide">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 ">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md max-h-[75vh] transform overflow-y-auto rounded-2xl bg-white dark:bg-primary-500 dark:text-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="font-medium leading-6 text-2xl"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-5">
                <p class="text-sm dark:text-gray-200">
                  <slot name="content" />
                </p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
