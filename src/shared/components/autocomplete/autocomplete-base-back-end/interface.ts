import { TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { IBuildQueryReturn } from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'

export type CustomAutocompleteValueBackEnd<
  T,
  Multiple extends boolean | undefined = false,
> = Multiple extends true ? T[] : T | null

export type CustomAutocompleteValueBackEnd2<
  Multiple extends boolean | undefined = false,
> = Multiple extends true ? string[] : string | null

export interface AutocompleteValueBackEndCommonProps<
  T,
  Multiple extends boolean | undefined = false,
> {
  value: string[] | string
  name: string
  onChange?: (value: CustomAutocompleteValueBackEnd2<Multiple>) => void
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
  multiple?: Multiple
  textFieldProps: TextFieldProps
  filter?: BaseRecord
  disabled?: boolean
  getOptionLabel?: (option: T) => ReactNode
  disableCloseOnSelect?: boolean
  open?: boolean
  list_disabled?: string[]
  popupIcon?: ReactNode
  removeOptions?: (options: T[]) => T[]
}
interface ISorting {
  direction: 'ASC' | 'DESC'
  field: string
}

export interface IAutocompleteBackEndProps<
  T,
  Multiple extends boolean = false,
> {
  name: string
  keyName: Leaves<T>
  selectedKey: keyof T
  value: string[] | string
  textFieldProps: TextFieldProps
  onChange?: (value: CustomAutocompleteValueBackEnd2<Multiple>) => void
  multiple?: Multiple
  queryKey: string[]
  queryString: IBuildQueryReturn
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
  filter?: BaseRecord
  orderBy?: ISorting
  disabled?: boolean
  getOptionLabel?: (option: T) => ReactNode
  disableCloseOnSelect?: boolean
  open?: boolean
  list_disabled?: string[]
  popupIcon?: ReactNode
  removeOptions?: (options: T[]) => T[]
}
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never
