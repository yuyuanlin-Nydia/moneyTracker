export function useDialogPlugin () {
    const { emit, proxy } = getCurrentInstance()!
    const dialogRef = ref(null)
  
    function show () { (dialogRef.value as any).show() }
    function hide () { (dialogRef.value as any).hide() }
  
    function onDialogOK (payload?: any) {
      emit('ok', payload)
      hide()
      emit('hide')
    }
  
    function onDialogHide () { 
      hide()
      emit('hide')
    }
  
    // expose public methods required by Dialog plugin
    Object.assign(proxy!, { show, hide })
  
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel: hide
    }
  }