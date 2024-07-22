import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers'

interface YearPickerProps {
  onChange: (value: Dayjs | null) => void
  value: Dayjs | null
  maxDate?: Dayjs
  minDate?: Dayjs
  disableFuture?: boolean
}

const YearPicker = (props: YearPickerProps) => {
  const { onChange, value = null, ...other } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['year']}
        value={value}
        onChange={(value) => onChange(value)}
        sx={{
          '& .MuiPickersCalendarHeader-label': {
            fontSize: 12,
            fontWeight: 700,
            lineHeight: '16px',
          },
          border: '1px solid #E3E6EB',
          borderRadius: '4px',
        }}
        {...other}
      />
    </LocalizationProvider>
  )
}

export default YearPicker
