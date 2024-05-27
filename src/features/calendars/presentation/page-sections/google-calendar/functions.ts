import { makeLeft, makeRight } from 'shared/utils/handleEither'
import { EventColor } from './interface'
import { Either } from 'shared/interfaces/common'
import dayjs from 'dayjs'
import {
  isAfterNow,
  isDurationWithinOneDay,
  replaceYearWithCurrent,
} from 'shared/utils/date'

const colorEvent: EventColor[] = [
  {
    id: 1,
    backgroundColor: '#ABF9E0',
    color: '#2A2E37',
    borderColor: '#D4FCEC',
  },
  {
    id: 2,
    backgroundColor: '#FFC5C3',
    color: '#2A2E37',
    borderColor: '#FFE4E1',
  },
  {
    id: 3,
    backgroundColor: '#FFEB95',
    color: '#2A2E37',
    borderColor: '#FFEB95',
  },
  {
    id: 4,
    backgroundColor: '#DDD5FF',
    color: '#2A2E37',
    borderColor: '#EEEAFF',
  },
  {
    id: 5,
    backgroundColor: '#B6DEFC',
    color: '#2A2E37',
    borderColor: '#E0F1FD',
  },
  {
    id: 6,
    backgroundColor: '#FFEAE4',
    color: '#2A2E37',
    borderColor: '#FFEAE4',
  },
]

let currentColor: EventColor

function randomColor(): number {
  if (!currentColor) {
    currentColor = colorEvent[0]
    return colorEvent[0].id
  } else {
    const nextColor = colorEvent.find((o) => o.id === currentColor.id + 1)
    if (nextColor) {
      currentColor = nextColor
      return nextColor.id
    } else {
      currentColor = colorEvent[0]
      return currentColor.id
    }
  }
}

// export function getColorEvent(id: number): EventColor | null {
//   const color = colorEvent.find((o) => o.id === id) ?? null
//   return color
// }

function isPast(date: Date) {
  if (isAfterNow(date)) return false
  return true
}

export function getColorEvent(date: Date) {
  if (isPast(date))
    return {
      backgroundColor: '#F0F1F8',
      color: '#82868C',
    }
  return {
    backgroundColor: 'white',
    color: '#000000',
  }
}

export default randomColor

export function adjustDateTime(
  originalDateTime: string,
  newDate: string
): Either<string, Date> {
  try {
    const originalDate = new Date(originalDateTime)
    const newBaseDate = new Date(newDate)
    originalDate.setUTCFullYear(newBaseDate.getUTCFullYear())
    originalDate.setUTCMonth(newBaseDate.getUTCMonth())
    originalDate.setUTCDate(newBaseDate.getUTCDate())
    return makeRight(originalDate)
  } catch {
    return makeLeft('not a valid date')
  }
}

export function convertToRootDate(start: Date, end: Date, root: Date) {
  const rootDate = dayjs(root)

  // Lấy thông tin giờ phút từ start và end
  const startHour = dayjs(start).hour()
  const startMinute = dayjs(start).minute()
  const endHour = dayjs(end).hour()
  const endMinute = dayjs(end).minute()

  // Tạo mới start và end theo ngày của root nhưng giữ nguyên giờ phút ban đầu
  const newStart = rootDate
    .hour(startHour)
    .minute(startMinute)
    .second(0)
    .millisecond(0)
  const newEnd = rootDate
    .hour(endHour)
    .minute(endMinute)
    .second(0)
    .millisecond(0)

  return {
    newStart: newStart.toDate(),
    newEnd: newEnd.toDate(),
  }
}

export function convertToRootByTimeNow(now: Date, root: Date) {
  const rootDate = dayjs(root)

  console.log('rootDate', rootDate)
  // Lấy thông tin giờ phút từ start và end
  const startHour = dayjs(now).hour()
  const startMinute = dayjs(now).minute()

  // Tạo mới start và end theo ngày của root nhưng giữ nguyên giờ phút ban đầu
  const newStart = rootDate
    .hour(startHour)
    .minute(startMinute)
    .second(0)
    .millisecond(0)

  return newStart
}

export function ruleDragDropCalendar(
  currentDate: Date,
  start: Date,
  end: Date,
  onCallbackWhenValid: () => void
): void {
  if (!isAfterNow(currentDate)) return
  if (!isAfterNow(start)) return
  if (isDurationWithinOneDay(start, end)) return
  onCallbackWhenValid()
}
export function formatStringToDate(
  start: string,
  end: string,
  currentDate: string
) {
  const startDate = replaceYearWithCurrent(start)
  const endDate = replaceYearWithCurrent(end)
  const interview_date = dayjs(currentDate).toDate()
  const { newEnd, newStart } = convertToRootDate(
    new Date(startDate),
    new Date(endDate),
    interview_date
  )
  return {
    newEnd,
    newStart,
    currentDate: interview_date,
  }
}
