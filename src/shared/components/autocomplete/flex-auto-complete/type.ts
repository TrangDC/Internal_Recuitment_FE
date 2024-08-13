import { TextFieldProps } from "@mui/material"
import { ReactNode } from "react"
import { CustomAutocompleteValueBackEnd } from "../autocomplete-base-back-end/interface"

export interface IFlexAutocompleteCommonProps<T, Multiple extends boolean> {
    value: string[] | string
    multiple: Multiple
    textFieldProps?: TextFieldProps
    onChange: (value: CustomAutocompleteValueBackEnd<T, Multiple>) => void
    disableCloseOnSelect?: boolean
    disabled?: boolean
    list_disabled?: string[]
    open?: boolean
    options:T[]
    selectedKey:keyof T
    keyName:Leaves<T>
    getOptionLabel?: (option: T) => ReactNode
  }

  export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never
