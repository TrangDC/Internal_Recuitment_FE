import { Autocomplete, Checkbox } from '@mui/material'
import ArrowRadius from 'shared/components/icons/ArrowRadius'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { SyntheticEvent } from 'react'
import { IFlexAutocompleteCommonProps } from './type'
import { getValueByKey } from 'shared/utils/utils'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const FlexAutocompleteBase = <T, Multiple extends boolean = false>(
  props: IFlexAutocompleteCommonProps<T, Multiple> & {
    multiple?: Multiple
  }
) => {
  const {
    multiple,
    textFieldProps,
    value,
    onChange,
    options,
    disabled,
    list_disabled = [],
    selectedKey,
    keyName,
    getOptionLabel,
  } = props
  let getValue: T[] | T | undefined
  if (multiple) {
    getValue = options.filter((o) =>
      value.includes((o[selectedKey] as string).toString())
    )
  } else {
    getValue = options.find(
      (o) => (o[selectedKey] as string).toString() === value
    )
  }

  function handleOnChange(
    _: SyntheticEvent<Element, Event>,
    value: T[] | T | null
  ) {
    const convertType: any = value
    onChange?.(convertType)
  }

  return (
    <Autocomplete
      {...props}
      size="small"
      disableCloseOnSelect={multiple}
      options={options}
      value={(getValue as any) ?? null}
      multiple={multiple}
      disabled={disabled}
      getOptionDisabled={(option) => list_disabled.includes(option.value)}
      noOptionsText={'No options'}
      onChange={(event, value) => handleOnChange(event, value)}
      popupIcon={<ArrowRadius sx={{ color: 'text.400', fontSize: '16px' }} />}
      renderInput={(params) => <AppTextField {...textFieldProps} {...params} />}
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
        backgroundColor: 'white',

        '& .MuiButtonBase-root.MuiChip-root': {
          backgroundColor: '#F1F9FF',
        },
        '& .MuiButtonBase-root.MuiChip-root span': {
          fontSize: '14px',
          color: '#121625',
          fontWeight: 500,
          lineHeight: '21px',
        },
      }}
    />
  )
}

export default FlexAutocompleteBase
