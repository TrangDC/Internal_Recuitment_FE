import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
  TextFieldProps,
  styled,
} from '@mui/material'
import React from 'react'
import { findKey, get, isEqual } from 'lodash'

interface AdditionalProps<T> {
  //@ts-ignore
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

export const CustomTextField = styled(TextField)(({ theme }) => ({
  maxWidth: '100%',
  marginTop: '10px',

  '& .MuiInputBase-root': {
    height: '100%',
    backgroundColor: 'white',
  },

  '& .MuiFormLabel-root span': {
    fontSize: '13px',
    fontWeight: 500,
    color: '#DB6C56',
    lineHeight: '15.85px',
  },
}))

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
    <Autocomplete
      sx={{ width: props?.fullWidth ? '100%' : '400px', maxWidth: '100%' }}
      size={size}
      limitTags={limitTags}
      options={options}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <CustomTextField {...inputProps} {...params} fullWidth />
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
