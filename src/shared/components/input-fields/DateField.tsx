import { Box, TextFieldProps, styled } from '@mui/material'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'

type ChosenDateType = Date | null

interface CustomDatePickerProps extends DatePickerProps<ChosenDateType> {
  textFieldProps?: TextFieldProps
}

const StyledInputBase = styled(Box)(({ theme }) => ({
  '& .MuiFormControl-root': {
    height: '100%',
  },

  '& .MuiFormControl-root .MuiFormLabel-root': {
    fontSize: '14px',
    fontWeight: 500,
  },

  '& .MuiFormControl-root .MuiInputBase-root .MuiInputBase-input': {
    fontWeight: 500,
  },

  '& .MuiFormControl-root .MuiFormLabel-root span': {
    fontSize: '13px',
    fontWeight: 500,
    color: ' #DB6C56',
    lineHeight: '15.85px',
  },

  '& .MuiInputBase-root': {
    height: '100%',
  },
}))

const AppDateField = ({
  textFieldProps = {
    size: 'small',
    sx: { width: '160px', height: '40px !important' },
  },
  ...props
}: CustomDatePickerProps) => {
  return (
    <StyledInputBase>
      <DatePicker slotProps={{ textField: { ...textFieldProps } }} {...props} />
    </StyledInputBase>
  )
}

export default AppDateField
