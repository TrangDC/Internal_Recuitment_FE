import { FieldErrors, FieldValues } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import AppDateField from 'shared/components/input-fields/DateField'
import { DatePickerProps } from '@mui/x-date-pickers'
import styled from '@emotion/styled'
import { TextFieldProps } from '@mui/material'

interface AdditionalProps<T extends FieldValues> {
  errors: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  textFieldProps?: TextFieldProps
}

type ChosenDateType = Date | null

type DateControllerProps<T extends object> = Omit<
  DatePickerProps<ChosenDateType>,
  keyof AdditionalProps<T>
> &
  AdditionalProps<T>

const StyleDateField = styled(AppDateField)(({ theme }) => ({
  marginTop: '10px',
}))

const DatePickerComponent = <T extends object>({
  defaultValue,
  errors,
  field,
  ...props
}: DateControllerProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <StyleDateField
        {...props}
        {...field}
        textFieldProps={{ fullWidth: true, size: 'small', required: true }}
        value={field.value}
        onChange={(value) => {
          field.onChange(value)
        }}
      />
      {error && (
        <DivError>
          <span>{error.message}</span>
        </DivError>
      )}
    </DivWrapper>
  )
}

export default DatePickerComponent
