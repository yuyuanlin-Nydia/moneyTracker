import { createApp } from 'vue'

type AnyFn = (data?: any) => any

export default {
  open(component: Component,props: Record<string, any>){
    return createDialog(component, props)
  }
}

const createDialog = function(dialog: Component, props: Record<string, any>) {
    const container = createNode('dialog')

    const dialogRef = ref(null)
    const okFns:AnyFn[] = []
    const cancelFns:AnyFn[] = []
    const dialogAPI = {
      onOk(fn: AnyFn){
        okFns.push(fn)
        return dialogAPI
      },
      onCancel(fn: AnyFn){
        cancelFns.push(fn)
        return dialogAPI
      }
    }

    const onOk = (data: AnyFn) => {
      okFns.forEach(fn => { fn(data) })
    }

    const onHide = () => {
      setTimeout(()=>{
        removeNode(container)
        dialogCom.unmount()
      },200)
    }

    const dialogCom = createApp({
      name: 'GlobalDialog',
      setup(){
        return () => h(dialog, {
          ref: dialogRef,
          onOk,
          onHide,
          ...props
        })
      }
    }) 
 
    dialogCom.mount(container)
    return dialogAPI 
}