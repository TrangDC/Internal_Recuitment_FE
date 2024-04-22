import { Box, styled } from '@mui/material'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'

type ChosenDateType = Date | null

interface CustomDatePickerProps extends DatePickerProps<ChosenDateType> {}

const StyledInputBase = styled(Box)(({ theme }) => ({
   width: '160px',

   '& .MuiFormControl-root': {
    height: '100%',
   },

   '& .MuiInputBase-root': {
    height: '100%',
   }
  }))

const AppDateField = ({ ...props }: CustomDatePickerProps) => {
  return (
    <StyledInputBase>
      <DatePicker  slotProps={{ textField: { size: 'small' } }}  {...props} />
    </StyledInputBase>
  )
}

export default AppDateField
