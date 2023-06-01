export const createNode = (id: string) => {
  const elm = document.createElement('div');
  if( id !== void 0){
    elm.id = id;
  }

  document.body.appendChild(elm)
  return elm;
}

export const removeNode = (elm: HTMLElement) => {
  document.body.removeChild(elm)
}