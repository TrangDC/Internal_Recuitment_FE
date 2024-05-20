import { View } from 'react-big-calendar'
import DatePickerCalendar, { ChosenDateType } from './DatePickerCalendar'
import { SxProps } from '@mui/material'
import WeekPicker from './WeekPicker'
import { formatDate } from '../config'
import dayjs from 'dayjs'

type IRenderDatePickerCalendar = {
  view: View
  onChange: (date: ChosenDateType) => void
  defaultDate: Date
}

function RenderDatePickerCalendar(props: IRenderDatePickerCalendar) {
  const { view, onChange, defaultDate } = props
  const date = dayjs(defaultDate)
  function onSeletedDate(value: ChosenDateType) {
    if (value) onChange(value)
  }

  const sx: SxProps = { width: '250px !important' }
  if (view === 'month')
    return (
      <DatePickerCalendar
        views={['month', 'year']}
        sx={sx}
        format={formatDate}
        onChange={onSeletedDate}
        value={date}
      />
    )
  if (view === 'day')
    return (
      <DatePickerCalendar
        views={['month', 'year', 'day']}
        sx={sx}
        format={formatDate}
        onChange={onSeletedDate}
        value={date}
      />
    )

  return <WeekPicker onChange={(value) => onSeletedDate(value)} value={date} />
}

export default RenderDatePickerCalendar
