import { TextFieldProps } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'

export type ChosenDateType = Dayjs | null

interface CustomDatePickerProps extends DatePickerProps<ChosenDateType> {
  textFieldProps?: TextFieldProps
}

const DatePickerCalendar = (props: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...props} />
    </LocalizationProvider>
  )
}

export default DatePickerCalendar
