import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers'

interface MonthPickerProps {
  onChange: (value: Dayjs | null) => void
  value: Dayjs | null
}

const MonthPicker = (props: MonthPickerProps) => {
  const { onChange, value = null } = props
  function handleOnChange(value: Dayjs) {
    onChange(value)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['year', 'month']}
        value={value}
        onChange={(value) => handleOnChange(value)}
      />
    </LocalizationProvider>
  )
}

export default MonthPicker
