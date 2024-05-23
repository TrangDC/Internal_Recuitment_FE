
import { get } from 'lodash'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker'
import styled from '@emotion/styled'
import { Span } from 'shared/components/Typography'

export const TimePickerField = styled(TimePicker)(({ theme }) => ({

  '& .MuiInputBase-root': {
    height: '40px',
  },

  '& .MuiFormLabel-root': {
    top: '-5px'
  }
}))

interface TimePickerComponentProps<T extends FieldValues> {
  errors?: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  label?: string
  timePickerProps?: TimePickerProps<unknown>
  required?: boolean,
}

const TimePickerComponent = <T extends object>({
  errors,
  field,
  label,
  required = false,
  timePickerProps,
}: TimePickerComponentProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <TimePickerField
        label={<p>{label} {required && <Span sx={{color: 'red'}}>*</Span>}</p>}
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
