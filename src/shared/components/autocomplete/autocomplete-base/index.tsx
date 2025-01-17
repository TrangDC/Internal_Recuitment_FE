import { Autocomplete, Checkbox } from '@mui/material'
import ArrowRadius from 'shared/components/icons/ArrowRadius'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { SyntheticEvent } from 'react'
import { IAutocompleteProps, IOption } from './interface'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const AutocompleteBase = <Multiple extends boolean = false>(
  props: IAutocompleteProps<Multiple> & {
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
  } = props
  let getValue: IOption[] | IOption | undefined
  if (multiple) {
    getValue = options.filter((o) => value.includes(o.value.toString()))
  } else {
    getValue = options.find((o) => o.value.toString() === value)
  }

  function handleOnChange(
    _: SyntheticEvent<Element, Event>,
    value: IOption[] | IOption | null
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
      getOptionLabel={(option) => (option ? option.label : '')}
      isOptionEqualToValue={(option, value) => option.value === value.value}
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
          {option ? option.label : ''}
        </li>
      )}
      sx={{
        backgroundColor: 'white',

        '& .MuiButtonBase-root.MuiChip-root': {
          backgroundColor: '#F1F9FF'
        },
        '& .MuiButtonBase-root.MuiChip-root span': {
          fontSize: '14px',
          color: '#121625',
          fontWeight: 500,
          lineHeight: '21px'
        }
      }}
    />
  )
}
