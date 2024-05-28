import { TextFieldProps, useTheme } from '@mui/material'
import {
  LocalizationProvider,
  TimePicker,
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
      <TimePicker
        {...props}
        slotProps={{
          textField: { size: 'small', ...props.textFieldProps },
        }}
        sx={{
          '& .MuiOutlinedInput-input': {
            fontWeight: 500,
            color: theme.palette.text.primary,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '4px',
            borderColor: `${theme.palette.grey[300]}`,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.hover,
              backgroundColor: '#F0F1F8 !important',
              color: '#4D607A',
              WebkitTextFillColor: '#4D607A',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '21px',
            color: theme.palette.grey[500],
            '& .MuiFormLabel-asterisk': {
              color: theme.palette.error.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { fontWeight: 600 },
          '& .MuiSvgIcon-root': { color: theme.palette.text.disabled },
        }}
      />
    </LocalizationProvider>
  )
}
