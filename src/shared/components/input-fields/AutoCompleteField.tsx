import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
  TextFieldProps,
  styled
} from '@mui/material'
import React from 'react'
import { findKey, get, isEqual } from 'lodash'

interface AdditionalProps<T> {
  options: T[]
  inputProps?: TextFieldProps
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode
  showLabel?: string
}

type AutoCompleteFieldProps<T extends object> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean, any>,
  keyof AdditionalProps<T>
> &
  AdditionalProps<T>

const AutoCompleteStyle = styled(Autocomplete)(({ theme }) => ({
  maxWidth: '100%',
}))

const TextFieldStyle = styled(TextField)`
  max-width: 100%;
  margin-top: 10px;

  .MuiInputBase-root {
    height: 100%;
    background-color: white;
  }

  .MuiFormLabel-root span{
    font-size: 13px;
    font-weight: 500;
    color: #DB6C56;
    line-height: 15.85px;
  }
`

const AutoCompleteField = <T extends object>({
  options,
  size = 'small',
  inputProps,
  value,
  multiple = true,
  renderInput,
  limitTags = 2,
  showLabel = 'name',
  ...props
}: AutoCompleteFieldProps<T>) => {
  const getKeyLabel = (object: any, key: string): string => {
    const lowerKey = key.toString().toLowerCase()

    //check if the key is exists in the object
    const isExistKey = findKey(object, (value, keyObj) => {
      return keyObj.toString().toLowerCase() === lowerKey
    })
    if (isExistKey) return isExistKey

    //check if the key is includes in the object
    const isIncludeKey = findKey(object, (value, keyObj) => {
      return keyObj.toString().toLowerCase().includes(lowerKey)
    })
    if (isIncludeKey) return isIncludeKey

    return Object.keys(object)[0]
  }

  return (
    <AutoCompleteStyle
      sx={{ width: props?.fullWidth ? '100%' : '400px' }}
      size={size}
      // open
      limitTags={limitTags}
      options={options}
      renderInput={(params) => (
        <TextFieldStyle {...inputProps} {...params} fullWidth />
      )}
      value={value}
      //@ts-ignore
      getOptionLabel={(optionLabel) =>
        get(optionLabel, getKeyLabel(optionLabel as T, showLabel))
      }
      //@ts-ignore
      isOptionEqualToValue={(option, value) => {
        return isEqual(option as T, value as T)
      }}
      multiple={multiple}
      {...props}
    />
  )
}

export default AutoCompleteField
