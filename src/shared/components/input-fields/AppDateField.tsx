import { TextFieldProps, useTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'

type ChosenDateType = Dayjs | null

interface CustomDatePickerProps extends DatePickerProps<ChosenDateType> {
  textFieldProps?: TextFieldProps
  value: Dayjs | null
}

const AppDateField = (props: CustomDatePickerProps) => {
  const theme = useTheme()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        format="DD/MM/YYYY"
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

export default AppDateField
