import { TextFieldProps, useTheme } from '@mui/material'
import {
  DigitalClock,
  DigitalClockProps,
  LocalizationProvider,
  TimeField,
  TimePickerProps,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

export type ChosenDateType = Dayjs | null

interface AppTimePickersProps extends TimePickerProps<ChosenDateType> {
  textFieldProps?: TextFieldProps
  value: Dayjs | null
}

export default function AppTimePickers(props: AppTimePickersProps) {
  const theme = useTheme()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
       
      />
    </LocalizationProvider>
  )
}
