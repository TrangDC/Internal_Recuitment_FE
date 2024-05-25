import { TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { IBuildQueryReturn } from 'services/graphql-services'
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
  onChange: (value: CustomAutocompleteValueBackEnd2<Multiple>) => void
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
  multiple?: Multiple
  textFieldProps: TextFieldProps
  filter?: BaseRecord
  disabled?:boolean
  getOptionLabel?: (option: T) => ReactNode
  disableCloseOnSelect?:boolean

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
  onChange: (value: CustomAutocompleteValueBackEnd2<Multiple>) => void
  multiple?: Multiple
  queryKey: string[]
  queryString: IBuildQueryReturn
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
  filter?: BaseRecord
  disabled?:boolean
  getOptionLabel?: (option: T) => ReactNode
  disableCloseOnSelect?:boolean
}
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never
