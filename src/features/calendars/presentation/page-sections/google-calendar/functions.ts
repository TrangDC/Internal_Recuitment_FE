import { makeLeft, makeRight } from 'shared/utils/handleEither'
import { EventColor } from './interface'
import { Either } from 'shared/interfaces/common'
import dayjs from 'dayjs'

const colorEvent: EventColor[] = [
  {
    id: 1,
    backgroundColor: '#ABF9E0',
    color: '#167E8D',
  },
  {
    id: 2,
    backgroundColor: '#FFC5C3',
    color: '#FC105C',
  },
  {
    id: 3,
    backgroundColor: '#FFEB95',
    color: '#936D19',
  },
  {
    id: 4,
    backgroundColor: '#DDD5FF',
    color: '#584CB7',
  },
  {
    id: 5,
    backgroundColor: '#B6DEFC',
    color: '#1F84EB',
  },
  {
    id: 6,
    backgroundColor: '#FFEAE4',
    color: '#DB6C56',
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

export function getColorEvent(id: number): EventColor | null {
  const color = colorEvent.find((o) => o.id === id) ?? null
  return color
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
