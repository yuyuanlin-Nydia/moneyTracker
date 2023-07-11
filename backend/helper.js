function mergeArrays(arr1 = [], arr2 = []) {
  let res = []
  res = arr1.map((_id) => {
    const index = arr2.findIndex(el => el._id == _id)
    const r = index !== -1 ? arr2[index] : {}
    return Object.assign({ _id, total: 0, list: [] }, r)
  })
  return res
}

function getLastMonth() {
  const today = new Date() // Get the current date
  let year = today.getFullYear() // Get the current year
  let month = today.getMonth() // Get the current month

  if (month === 0) { // If it's January
    year-- // Subtract 1 from the year
    month = 11 // Set the month to December (11 is the index for December)
  }
  else {
    month-- // Subtract 1 from the month
  }

  return { year, month: month + 1 }
}

function getDiffDays(date1, date2) {
  const dateA = new Date(date1)
  const dateB = new Date(date2)
  const diffTime = Math.abs(dateA - dateB)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
module.exports = {
  mergeArrays,
  getLastMonth,
  getDiffDays,
}
