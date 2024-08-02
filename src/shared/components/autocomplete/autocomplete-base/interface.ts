import { TextFieldProps } from '@mui/material'

export class IOption {
  label: string
  value: string
  constructor({ label, value }: IOption) {
    this.label = label
    this.value = value
  }

  static instanceOf(object: any): object is IOption {
    return 'label' in object && 'value' in object
  }
}

export interface IAutocompleteProps<Multiple extends boolean>
  extends IAutocompleteCommonProps<Multiple> {
  options: IOption[]
  list_disabled?: string[]
}

export type CustomAutocompleteValue<Multiple extends boolean> =
  Multiple extends true ? IOption[] : IOption | null

export interface IAutocompleteCommonProps<Multiple extends boolean> {
  value: string[] | string
  multiple: Multiple
  textFieldProps?: TextFieldProps
  onChange: (value: CustomAutocompleteValue<Multiple>) => void
  disableCloseOnSelect?: boolean
  disabled?: boolean
  list_disabled?: string[]
  open?: boolean
}
