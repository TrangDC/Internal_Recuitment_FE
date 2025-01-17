import { FieldValues, FieldErrors } from 'react-hook-form'
import {
  DivError,
  DivWrapper,
} from '../styles'
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextFieldProps,
} from '@mui/material'
import { get } from 'lodash'
import { ReactNode } from 'react'
import AutoCompleteField from 'shared/components/input-fields/AutoCompleteField'

interface AdditionalProps<T extends FieldValues, Option> {
  errors?: FieldErrors<T>
  label: keyof Option
  options: Option[]
  inputLabel?: string
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
  keySelect?: string
  field: {
    onChange: (value: Option | Option[] | null) => void
    value: any
    name: string
  }
  inputProps?: TextFieldProps,
  callbackOnChange?: ({previousValue, value}: {previousValue: any, value: any}) => void;
  required?: boolean,
}

type AutoCompleteControllerProps<T extends object, Option> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean, any>,
  keyof AdditionalProps<T, Option>
> &
  AdditionalProps<T, Option>

  //@ts-ignore
const AutoCompleteComponent = <T extends object, Option extends object>({
  options,
  label,
  errors,
  inputLabel = '',
  multiple = false,
  renderInput,
  keySelect = 'id',
  field,
  size = 'small',
  inputProps,
  disabled = false,
  callbackOnChange,
  required = false,
  ...props
}: AutoCompleteControllerProps<T, Option>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <AutoCompleteField
        multiple={multiple}
        fullWidth
         //@ts-ignore
        options={options}
        value={field.value}
       //@ts-ignore
        onChange={(event, value: Option | Option[], reason) => {
          field.onChange(value)
          callbackOnChange && callbackOnChange({previousValue: field.value, value})
        }}
        showLabel={label as string}
        inputProps={{ label: inputLabel, required: required, ...inputProps }}
        disabled={disabled}
      />
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default AutoCompleteComponent
