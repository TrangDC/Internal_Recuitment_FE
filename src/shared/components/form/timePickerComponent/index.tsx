import { TimePickerProps } from '@mui/lab'
import { get } from 'lodash'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import styled from '@emotion/styled'

export const TimePickerField = styled(TimePicker)(({ theme }) => ({
  marginTop: '10px',

  '& .MuiInputBase-root': {
    height: '40px',
  },

  '& .MuiFormLabel-root': {
    top: '-5px'
  }
}))

interface TimePickerComponentProps<T extends FieldValues> {
  errors: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  label?: string
  timePickerProps?: TimePickerProps<Date>
}

const TimePickerComponent = <T extends object>({
  errors,
  field,
  label,
  timePickerProps,
}: TimePickerComponentProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <TimePickerField
        label={label}
        ampm={false}
        {...timePickerProps}
        value={field.value}
        onChange={(newValue: any) => {
          field.onChange(newValue)
        }}
      />
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default TimePickerComponent
