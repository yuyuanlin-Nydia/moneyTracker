export function createNode(id: string) {
  const elm = document.createElement('div')
  if (id !== void 0)
    elm.id = id

  document.body.appendChild(elm)
  return elm
}

export function removeNode(elm: HTMLElement) {
  document.body.removeChild(elm)
}
