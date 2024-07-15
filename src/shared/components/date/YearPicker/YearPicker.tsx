import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers'

interface YearPickerProps {
  onChange: (value: Dayjs | null) => void
  value: Dayjs | null
}

const YearPicker = (props: YearPickerProps) => {
  const { onChange, value = null } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['year']}
        value={value}
        onChange={(value) => onChange(value)}
      />
    </LocalizationProvider>
  )
}

export default YearPicker
