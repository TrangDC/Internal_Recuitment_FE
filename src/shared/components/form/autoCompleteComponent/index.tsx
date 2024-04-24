import { FieldValues, FieldErrors } from 'react-hook-form'
import {
  DivError,
  DivWrapper,
} from '../styles'
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
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
}

type AutoCompleteControllerProps<T extends object, Option> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean, any>,
  keyof AdditionalProps<T, Option>
> &
  AdditionalProps<T, Option>

const AutoCompleteComponent = <T extends object, Option>({
  options,
  label,
  errors,
  inputLabel = '',
  multiple = false,
  renderInput,
  keySelect = 'id',
  field,
  size = 'small',
  ...props
}: AutoCompleteControllerProps<T, Option>) => {
  const error = get(errors, field.name as string)

  return (
    <DivWrapper>
      <AutoCompleteField
        multiple={multiple}
        fullWidth
        options={options}
        value={field.value}
        onChange={(event, value: Option | Option[], reason) => {
          field.onChange(value)
        }}
        inputProps={{ label: inputLabel, required: true }}
      />
      {/* {multiple && (
        <DivListOption>
          <FlexBox gap={'10px'} flexWrap={'wrap'}>
            {(field.value as Option[]).map((option, index) => {
              return (
                <CustomStyleManage key={index}>
                  <Chip
                    //@ts-ignore
                    label={option[label]}
                    variant="outlined"
                    deleteIcon={
                      <CloseIcon
                        sx={{
                          height: '15x',
                          width: '15px',
                          color: greyLight[300],
                          cursor: 'pointer',
                        }}
                      />
                    }
                    onDelete={
                      props.disabled
                        ? undefined
                        : () => {
                            const filterValue = (
                              field.value as Option[]
                            ).filter((item: Option) => {
                              //@ts-ignore
                              return item[keySelect] !== option[keySelect]
                            })
                            field.onChange([...filterValue])
                          }
                    }
                  />
                </CustomStyleManage>
              )
            })}
          </FlexBox>
        </DivListOption>
      )} */}
      {error && (
        <DivError>
          <span>{error.message}</span>{' '}
        </DivError>
      )}
    </DivWrapper>
  )
}

export default AutoCompleteComponent
