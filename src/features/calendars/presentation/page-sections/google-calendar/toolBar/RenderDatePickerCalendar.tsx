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

  const sx: SxProps = {
    width: '250px !important',
    '& .MuiInputBase-root': {
      position: 'relative !important',
      WebkitBoxSizing: 'unset !important',
      '& input': {
        padding: '8.5px 0px 8.5px 14px',
      },
    },
  }
  if (view === 'month')
    return (
      <DatePickerCalendar
        views={['month', 'year']}
        sx={sx}
        slotProps={{}}
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

  return (
    <WeekPicker
      onChange={(value) => onSeletedDate(value)}
      value={date}
      sx={sx}
    />
  )
}

export default RenderDatePickerCalendar
