import { FieldErrors, FieldValues } from 'react-hook-form'
import { CustomTextField, DivError, DivWrapper } from '../styles'
import { TextFieldProps } from '@mui/material'
import { get } from 'lodash'
import { regexCharacterNumber, regexNumber } from './constant'
import { ChangeEvent, FocusEvent } from 'react'
import { NumericFormat } from 'react-number-format'

interface AdditionalProps<T extends FieldValues> {
  errors: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  thousandSeparator?: boolean,
}

type InputControllerProps<T extends object> = Omit<
  TextFieldProps,
  keyof AdditionalProps<T>
> &
  AdditionalProps<T>

const InputNumberComponent = <T extends object>({
  defaultValue,
  errors,
  field,
  size = 'small',
  thousandSeparator = false,
  ...props
}: InputControllerProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <NumericFormat
        sx={{ width: props?.fullWidth ? '100%' : '400px' }}
        size={size}
        {...props}
        {...field}
        value={field.value}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          const previousValue = field.value
          if (
            props.type === 'number' &&
            !regexCharacterNumber.test(value) &&
            value
          ) {
            field.onChange(previousValue ? previousValue : '')
          } else {
            field.onChange(value)
          }
        }}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          if (props.type === 'number' && !regexNumber.test(e.target.value)) {
            field.onChange('')
          }
        }}
        //@ts-ignore
        customInput={CustomTextField}
        thousandSeparator={thousandSeparator}
      />
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default InputNumberComponent
