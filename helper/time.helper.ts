import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)

export function dayjsTz(val?: string) {
  return dayjs(val).tz('Asia/Taipei')
}

export function getLastMonth() {
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

export function getDiffDays(date1: Date, date2: Date) {
  const dateA: any = new Date(date1)
  const dateB: any = new Date(date2)
  const diffTime = Math.abs(dateA - dateB)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
