const StringIsNumber = (value: any) => isNaN(Number(value)) === false

export function ToArray(enumName: any) {
  return Object.keys(enumName)
    .filter(StringIsNumber)
    .map(key => ({ value: key, name: enumName[key] }))
}
