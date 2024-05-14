import { FieldErrors, FieldValues } from 'react-hook-form'
import { DivError, DivWrapper } from '../styles'
import { get } from 'lodash'
import AppDateField from 'shared/components/input-fields/DateField'
import { DatePickerProps } from '@mui/x-date-pickers'
import { TextFieldProps, styled } from '@mui/material'

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

const StyleDateField = styled(AppDateField)(() => ({
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
       textFieldProps={{ fullWidth: true, size: 'small', required: true }}
        {...props}
        {...field}
        value={field.value}
        onChange={(value: Event) => {
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
