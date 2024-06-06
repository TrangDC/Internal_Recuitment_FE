import { FieldErrors, FieldValues } from 'react-hook-form'
import { CustomTextField, DivError, DivWrapper } from '../styles'
import { SxProps, TextFieldProps } from '@mui/material'
import { get } from 'lodash'
import { ChangeEvent } from 'react'
import { NumericFormat } from 'react-number-format'

interface AdditionalProps<T extends FieldValues> {
  errors?: FieldErrors<T>
  field: {
    onChange: (value: any) => void
    value: any
    name: string
  }
  thousandSeparator?: boolean,
  allowNegative?: boolean,
  sx?: SxProps,
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
  allowNegative = true,
  sx,
  ...props
}: InputControllerProps<T>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <NumericFormat
        sx={{ width: props?.fullWidth ? '100%' : '400px', ...sx }}
        size={size}
        allowNegative={allowNegative}
        {...props}
        {...field}
        value={field.value}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          field.onChange(value)
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
