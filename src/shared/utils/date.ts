import dayjs from 'dayjs'
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

// Hàm chuyển đổi thời gian từ UTC về múi giờ của client
export function convertFromUTC(utcDateTime: Date) {
  return dayjs.utc(utcDateTime).tz(dayjs.tz.guess())
}
