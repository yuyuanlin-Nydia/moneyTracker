import dialog from './dialog'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      dialog
    }
  }
})
