import { Autocomplete, Checkbox } from '@mui/material'
import ArrowRadius from 'shared/components/icons/ArrowRadius'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { SyntheticEvent } from 'react'
import {
  CustomAutocompleteValueBackEnd,
  CustomAutocompleteValueBackEnd2,
  IAutocompleteBackEndProps,
} from './interface'
import useAutoCompleteBackEnd from './useAutoCompleteBackEnd'
import { getValueByKey } from 'shared/utils/utils'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const AutocompleteBaseBackEnd = <T, Multiple extends boolean = false>(
  props: IAutocompleteBackEndProps<T, Multiple> & { multiple?: boolean }
) => {
  const {
    multiple,
    keyName,
    textFieldProps,
    value,
    selectedKey,
    onChange,
    onCustomChange,
    queryKey,
    queryString,
    name,
    filter,
    disabled,
    getOptionLabel,
    disableCloseOnSelect,
  } = props

  const { options } = useAutoCompleteBackEnd<T>({
    queryKey: queryKey.concat([JSON.stringify(filter)]),
    queryString: queryString,
    variables: {
      orderBy: {
        direction: 'ASC',
        field: 'created_at',
      },
      filter,
    },
  })

  let getValue
  if (multiple) {
    getValue = options.filter((o) =>
      value?.includes((o[selectedKey] as string).toString())
    ) as CustomAutocompleteValueBackEnd<T, Multiple>
  } else {
    getValue = options.find(
      (o) => (o[selectedKey] as string).toString() === value
    ) as CustomAutocompleteValueBackEnd<T, Multiple>
  }
  function handleOnChange(
    event: SyntheticEvent<Element, Event>,
    value: CustomAutocompleteValueBackEnd<T, Multiple>
  ) {
    let getValueBySelectedKey: CustomAutocompleteValueBackEnd2<Multiple>
    if (multiple) {
      getValueBySelectedKey = (value as T[]).map(
        (o) => o?.[selectedKey] as string
      ) as CustomAutocompleteValueBackEnd2<Multiple>
    } else {
      getValueBySelectedKey = (value as T)?.[
        selectedKey
      ] as CustomAutocompleteValueBackEnd2<Multiple>
    }
    onChange?.(getValueBySelectedKey)
    onCustomChange?.(value)
  }
  return (
    <Autocomplete<T, Multiple>
      {...props}
      disableCloseOnSelect={disableCloseOnSelect}
      size="small"
      value={(getValue as any) ?? null}
      options={options}
      multiple={multiple as Multiple | undefined}
      noOptionsText={'No options'}
      onChange={handleOnChange}
      disabled={disabled}
      limitTags={2}
      popupIcon={<ArrowRadius sx={{ color: 'text.400', fontSize: '16px' }} />}
      renderInput={(params) => (
        <AppTextField
          {...textFieldProps}
          {...params}
          name={name}
          disabled={disabled}
        />
      )}
      getOptionLabel={(option) => {
        const label = getValueByKey(option, keyName) ?? ''
        return option ? label : ''
      }}
      isOptionEqualToValue={(option, value) =>
        option[selectedKey] === value[selectedKey]
      }
      renderOption={(propsRenderOption, option, { selected }) => {
        const label = getValueByKey(option, keyName) ?? ''
        const labelNode = getOptionLabel ? getOptionLabel(option) : null
        return (
          <li {...propsRenderOption}>
            {multiple && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            {getOptionLabel ? labelNode : label}
          </li>
        )
      }}
      sx={{
        '& .MuiInputBase-root .MuiChip-labelSmall': {
          color: '#121625',
          backgroundColor: '#F1F9FF',
        },
      }}
    />
  )
}
