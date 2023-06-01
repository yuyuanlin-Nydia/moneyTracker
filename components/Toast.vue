<script setup lang="ts">
type MessageType = 'default' | 'success' | 'warning' | 'error'
interface MessageProps {
  message: string,
  type?: MessageType,
  visible?: boolean,
  duration?: number,
}

const props = withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'default',
  visible: true,
  duration: 3000,
})
const localVisible = ref(props.visible);
const toastArr = ref<string[]>([]);
toastArr.value.push(props.message)
const typeColor = {
  "default": () => 'bg-green-500 border-green-200', 
  "success": () => 'bg-green-500 border-green-200', 
  "warning": () => 'bg-yellow-500 border-yellow-200', 
  "error": () => 'bg-red-500 border-red-200', 
}

function getTypeColor(){
 return typeColor[props.type]()
}


let transitionTimer = setTimeout(() => {
    localVisible.value = false
  }, props.duration - 300
)

let domRemoveTimer = setTimeout(() => {
  removeNode(document.querySelector('#toast')!)
  }, props.duration
)

onUnmounted(()=>{
  clearTimeout(transitionTimer)
  clearTimeout(domRemoveTimer)
})
</script>

<template>
  <Transition name="slide-fade" appear>
    <div v-if="localVisible">
        <div 
          v-for="toast in toastArr" 
          :key="toast" 
          :class="[getTypeColor(), 'flex', 'opacity-90', 'w-60', 'justify-center', 'border-2', 'py-2', 'shadow-md',	'shadow-gray-400', 'rounded']"
        >
          <span class="text-white">{{ toast }}</span>
        </div>
      </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>