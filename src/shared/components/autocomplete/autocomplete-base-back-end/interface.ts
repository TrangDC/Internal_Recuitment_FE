import { TextFieldProps } from '@mui/material'
import { IbuildQueryReturn } from 'services/graphql-services'

export type CustomAutocompleteValueBackEnd<
  T,
  Multiple extends boolean | undefined = false,
> = Multiple extends true ? T[] : T | null

export interface AutocompleteValueBackEndCommonProps<
  T,
  Multiple extends boolean | undefined = false,
> {
  value: string[] | string
  name: string
  onChange: (value: string[] | string) => void
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
  multiple?: boolean
  textFieldProps: TextFieldProps
}

export interface IAutocompleteBackEndProps<
  T,
  M,
  P,
  Multiple extends boolean = false,
> {
  keyName: P
  seletedKey: M
  name: string,
  value: string[] | string
  textFieldProps: TextFieldProps
  onChange: (value: string[] | string) => void
  multiple?: boolean
  queryKey: string[]
  queryString: IbuildQueryReturn
  onCustomChange?: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
}
