import { Autocomplete, Checkbox } from '@mui/material'
import ArrowRadius from 'shared/components/icons/ArrowRadius'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { SyntheticEvent } from 'react'
import {
  CustomAutocompleteValueBackEnd,
  IAutocompleteBackEndProps,
} from './interface'
import useAutoCompleteBackEnd from './useAutoCompleteBackEnd'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const AutocompleteBaseBackEnd = <
  T,
  M extends keyof T,
  P extends keyof T,
  Multiple extends boolean = false,
>(
  props: IAutocompleteBackEndProps<T, M, P, Multiple> & { multiple?: boolean }
) => {
  const {
    multiple,
    keyName,
    textFieldProps,
    value,
    seletedKey,
    onChange,
    onCustomChange,
    queryKey,
    queryString,
  } = props

  const { options } = useAutoCompleteBackEnd<T>({
    queryKey: queryKey,
    queryString: queryString,
    variables: {
      orderBy: {
        direction: 'ASC',
        field: 'name',
      },
    },
  })

  let getValue
  if (multiple) {
    getValue = options.filter((o) =>
      value?.includes((o[seletedKey] as string).toString())
    ) as CustomAutocompleteValueBackEnd<T, Multiple>
  } else {
    getValue = options.find(
      (o) => (o[seletedKey] as string).toString() === value
    ) as CustomAutocompleteValueBackEnd<T, Multiple>
  }
  function handleOnChange(
    event: SyntheticEvent<Element, Event>,
    value: CustomAutocompleteValueBackEnd<T, Multiple>
  ) {
    let getValueBySeletedKey
    if (multiple) {
      getValueBySeletedKey = (value as T[]).map(
        (o) => o?.[seletedKey] as string
      )
    } else {
      getValueBySeletedKey = (value as T)?.[seletedKey] as string
    }
    console.log('getValueBySeletedKey', getValueBySeletedKey)
    onChange?.(getValueBySeletedKey)
    onCustomChange?.(value)
  }
  return (
    <Autocomplete<T, Multiple>
      size="small"
      value={(getValue as any) ?? null}
      options={options}
      multiple={multiple as Multiple | undefined}
      noOptionsText={'No options'}
      onChange={handleOnChange}
      limitTags={2}
      popupIcon={<ArrowRadius sx={{ color: 'text.400', fontSize: '16px' }} />}
      renderInput={(params) => <AppTextField {...textFieldProps} {...params} />}
      getOptionLabel={(option) =>
        option ? ((option as T)[keyName] as string) : ''
      }
      isOptionEqualToValue={(option, value) =>
        option[seletedKey] === value[seletedKey]
      }
      renderOption={(propsRenderOption, option, { selected }) => (
        <li {...propsRenderOption}>
          {multiple && (
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          )}
          {option ? ((option as T)[keyName] as string) : ''}
        </li>
      )}
      sx={{
        '& .MuiInputBase-root .MuiChip-labelSmall': {
          color: '#121625',
          backgroundColor: '#F1F9FF',
        },
      }}
    />
  )
}
