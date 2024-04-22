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

  '& .MuiFormControl-root .MuiFormLabel-root span': {
    fontSize: '13px',
    fontWeigth: 500,
    color:' #DB6C56',
    lineHeight: '15.85px'
  },

  '& .MuiInputBase-root': {
    height: '100%',
  },
}))

const AppDateField = ({
  textFieldProps = { size: 'small', sx: {width: '160px'} },
  ...props
}: CustomDatePickerProps) => {
  return (
    <StyledInputBase>
      <DatePicker slotProps={{ textField: { ...textFieldProps,  } }} {...props} />
    </StyledInputBase>
  )
}

export default AppDateField
