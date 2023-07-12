const StringIsNumber = (value: any) => Number.isNaN(Number(value)) === false

export function ToArray(enumName: any) {
  return Object.keys(enumName)
    .filter(StringIsNumber)
    .map(key => ({ value: key, name: enumName[key] }))
}

export function mergeArrays(arr1: Array<any> = [], arr2: Array<any> = []) {
  let res = []
  res = arr1.map((_id) => {
    const index = arr2.findIndex((el: any) => el._id === _id)
    const r = index !== -1 ? arr2[index] : {}
    return Object.assign({ _id, total: 0, list: [] }, r)
  })
  return res
}
