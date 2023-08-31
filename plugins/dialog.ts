import { createApp } from 'vue'
import { defaultConfig, plugin } from '@formkit/vue'
import config from '@/formkit.config'

type AnyFn = (data?: any) => any

const createDialog = function (dialog: Component, props: Record<string, any>) {
  const container = createNode('dialog')

  const dialogRef = ref(null)
  const okFns: AnyFn[] = []
  const cancelFns: AnyFn[] = []
  const dialogAPI = {
    onOk(fn: AnyFn) {
      okFns.push(fn)
      return dialogAPI
    },
    onCancel(fn: AnyFn) {
      cancelFns.push(fn)
      return dialogAPI
    },
  }

  const onOk = (data: AnyFn) => {
    okFns.forEach((fn) => { fn(data) })
  }

  const onHide = () => {
    setTimeout(() => {
      removeNode(container)
      dialogCom.unmount()
    }, 200)
  }

  const dialogCom = createApp({
    name: 'GlobalDialog',
    setup() {
      return () => h(dialog, {
        ref: dialogRef,
        onOk,
        onHide,
        ...props,
      })
    },
  })

  dialogCom
    .use(plugin, defaultConfig((config)))
    .mount(container)

  return dialogAPI
}

export default {
  open(component: Component, props: Record<string, any>) {
    return createDialog(component, props)
  },
}
