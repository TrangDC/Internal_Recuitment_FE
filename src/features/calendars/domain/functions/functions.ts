import dayjs from 'dayjs'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'

export const shouldDisableTime = (timeValue: ChosenDateType, view: string) => {
  const currentTime = dayjs()
  if (timeValue) {
    if (view === 'hours') {
      // Disable hours in the past
      return (
        timeValue?.hour() < currentTime.hour() &&
        timeValue.isSame(currentTime, 'day')
      )
    }
    if (view === 'minutes') {
      // Disable minutes in the past if same hour and same day
      return (
        timeValue.minute() < currentTime.minute() &&
        timeValue.isSame(currentTime, 'day') &&
        timeValue.hour() === currentTime.hour()
      )
    }
  }
  return false
}

export function handleGenerateToDate(from: ChosenDateType) {
  if (from) {
    const endOfDay = from.endOf('day')
    let to = from.add(30, 'minute')
    if (to.isAfter(endOfDay)) {
      return endOfDay.toDate()
    }
    return to.toDate()
  }
}
