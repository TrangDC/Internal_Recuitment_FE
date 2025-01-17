import { FieldErrors, FieldValues } from 'react-hook-form'
import { CustomTextField, DivError, DivWrapper } from '../styles'
import { TextFieldProps } from '@mui/material'
import { get } from 'lodash'
import { ChangeEvent } from 'react'

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

const InputComponent = <T extends object>({
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
      <CustomTextField
        sx={{ width: props?.fullWidth ? '100%' : '400px' }}
        size={size}
        {...props}
        {...field}
        value={field.value}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          field.onChange(value)
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

export default InputComponent
