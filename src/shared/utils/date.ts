import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
export function formatDateToString(value: Date | undefined, format: string) {
  if (value) {
    const formattedDate = dayjs(value).format(format)
    return formattedDate
  }
  return ''
}

export function getTime(value: Date | undefined) {
  if (value) {
    const date = dayjs(value)
    const formattedDate = date.format('HH:mm')
    return formattedDate
  }
  return ''
}

export function convertToLocalTime(isoDate: Date) {
  return dayjs(isoDate).tz(dayjs.tz.guess()).toDate()
}

export function formatToISO(originalDateTime: Date): Date {
  const timezoneOffsetMinutes = new Date(originalDateTime).getTimezoneOffset()
  const utcTime = new Date(
    originalDateTime.getTime() - timezoneOffsetMinutes * 60 * 1000
  )
  return utcTime
}

export function convertToUTC(clientDateTime: Date) {
  return dayjs(clientDateTime).tz(dayjs.tz.guess()).utc()
}

export function convertToEndDateUTC(date: Date) {
  return dayjs(date).endOf('date').toISOString()
}

// Hàm chuyển đổi thời gian từ UTC về múi giờ của client
export function convertFromUTC(utcDateTime: Date) {
  return dayjs.utc(utcDateTime).tz(dayjs.tz.guess())
}

export function isAfterNow(dateStr: Date) {
  // Chuyển chuỗi ngày nhập vào thành đối tượng dayjs
  const inputDate = dayjs(dateStr)

  const currentDate = dayjs()

  // Lấy ngày giờ hiện tại

  // So sánh ngày nhập vào với ngày hiện tại
  return inputDate.isAfter(currentDate) || inputDate.isSame(currentDate)
}

export function isDateAfterToday(date: Date) {
  // Chuyển chuỗi ngày nhập vào thành đối tượng dayjs
  const inputDate = dayjs(date)

  // Lấy ngày giờ hiện tại
  const currentDate = dayjs().subtract(24, 'hour')

  // So sánh ngày nhập vào với ngày hiện tại
  return inputDate.isAfter(currentDate)
}

export function isDurationWithinOneDay(start_date: Date, end_date: Date) {
  // Chuyển đổi các ngày nhập vào thành đối tượng dayjs
  const startDay = dayjs(start_date)
  const endDay = dayjs(end_date)

  // Kiểm tra nếu khoảng thời gian vượt quá 1 ngày
  return !endDay.isBefore(startDay.endOf('day').subtract(1, 'second'))
}

export function isPast(date: Date) {
  if (!isAfterNow(date)) return false
  return true
}

export function replaceYearWithCurrent(dateString: string) {
  const currentYear = new Date().getFullYear() // Lấy năm hiện tại
  return dateString.replace(/^0001/, currentYear.toString()) // Thay thế năm "0001" bằng năm hiện tại
}

export function isAfterDate(a: Date, b: Date) {
  const input = dayjs(a)
  const date = dayjs(b)
  return input.isAfter(date)
}

export const areDatesEqual = (date1: Date, date2: Date) => {
  const format = 'YYYY-MM-DD HH:mm'
  return dayjs(date1).format(format) === dayjs(date2).format(format)
}

export const getLocalTimeOffset = () => {
  const localTimezone = dayjs.tz.guess()
  const offsetInMinutes = dayjs().tz(localTimezone).utcOffset()
  return offsetInMinutes / 60 // đổi phút sang giờ
}

export const setTimeToStartOfDay = (date: Dayjs): Dayjs => {
  return date.hour(0).minute(0).second(0).millisecond(0)
}

export const setTimeToEndOfDay = (date: Dayjs) => {
  return date.hour(23).minute(59).second(59).millisecond(999)
}

export const getQuarter = (date: string) => {
  const month = dayjs(date).month()
  return Math.floor(month / 3) + 1
}

export const formatLocalTime = (utcTime: Dayjs) => {
  const localTime = dayjs.utc(utcTime).tz(dayjs.tz.guess())
  return localTime
}

export function convertToRootDate(date: Date, root: Date) {
  const rootDate = dayjs(root)
  const hour = dayjs(date).hour()
  const minute = dayjs(date).minute()
  const newStart = rootDate.hour(hour).minute(minute).second(0).millisecond(0)

  return newStart
}

export function calculateTimeDifference(inputTime: Date) {
  const now = new Date()
  const inputDate = new Date(inputTime)

  let years = now.getFullYear() - inputDate.getFullYear()
  let months = now.getMonth() - inputDate.getMonth()
  let days = now.getDate() - inputDate.getDate()
  let hours = now.getHours() - inputDate.getHours()
  let minutes = now.getMinutes() - inputDate.getMinutes()
  let seconds = now.getSeconds() - inputDate.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }

  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }

  if (hours < 0) {
    hours += 24
    days -= 1
  }

  if (days < 0) {
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += lastMonth.getDate()
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  }
}

export function formatTimeDifference(props: {
  timeDiff: {
    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  shows: Array<'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'>
}) {
  const { timeDiff, shows } = props
  const { years, months, days, hours, minutes, seconds } = timeDiff
  const parts = []

  if (shows.includes('years') && years > 0) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`)
  }
  if (shows.includes('months') && months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`)
  }
  if (shows.includes('days') && days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`)
  }
  if (shows.includes('hours') && hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  }
  if (shows.includes('minutes') && minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  }
  if (shows.includes('seconds')) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}.`)
  }

  return parts.join(', ')
}
