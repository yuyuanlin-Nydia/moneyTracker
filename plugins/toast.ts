import Message from '@/components/Toast.vue'
import { createApp, render } from 'vue'


interface ToastProps {
  message?: string,
  type?: 'success' | 'warning' | 'error',
  visible?: boolean,
  duration?: number,
}


const crateToast = function(props: ToastProps) {
  if (process.client) {
    if (!props.visible) return

    if(!document.querySelector('#toastBox')){
      var toastBox = createNode('toastBox') 
      toastBox.className = "fixed bottom-6 grid justify-items-center justify-center w-full gap-3"
    }
    
    const toastRef = ref(null)
    const container = createNode('toast')
    const ToastCom = createApp({
      name: 'GlobalToast',
      setup(){
        return () => h(Message, {
          ref: toastRef,
          ...props
        })
      }
    }) 
  
    ToastCom.mount(container)
    setTimeout(()=>{
      document.querySelector('#toastBox')?.removeChild(container)
      ToastCom.unmount()
    },3000)
    const  hasBox = document.querySelector('#toastBox')
    if(hasBox){
      document.querySelector('#toastBox')!.appendChild(container)
    }else{
      document.body.appendChild(container)
    }
  }
}

export default {
  success(message: string) {
    crateToast({ type: 'success', visible: true, message })
  },

  warning(message: string) {
    crateToast({ type: 'warning', visible: true, message })
  },

  error(message: string) {
    crateToast({ type: 'error', visible: true, message })
  }

}