import { ReactNode } from 'react'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import { ISearchData } from './hooks/useSearchList'
import { BaseRecord } from 'shared/interfaces'
import { ModuleProject } from './hooks/useStoreData'

export type ListFiltersData<T> = {
  [key in keyof T]: ConditionValue<T[key]>
}
export type ValueTypes = 'string' | 'string[]'

export type FilterValue = Record<string, ValueTypes>

export type ConditionValue<Value> = Value extends string ? IOption : IOption[]

export type InterfaceGenerate<T extends FilterValue> = {
  [K in keyof T]: T[K] extends 'string[]' ? string[] : string
}

export type ListFiltersDataWithKey = {
  [key: string]: string[] | string
}

export type UseFilter<T> = {
  defaultFilter?: T
  cacheData?: ListFiltersData<T>
  formatDataWithValue?: (
    data: ListFiltersData<T> | undefined
  ) => DataFilterWithValue<T>
}

export type UseFilterReturn<T> = {
  dataFilterWithValue: DataFilterWithValue<T>
  controlFilter: ControlFilter<T>
}

type DataFilterWithValue<T> = {
  [A in keyof T]: any
}

type ControlFilter<T> = {
  onFilter: (value: ParamFilter<T>) => void
  filter?: ListFiltersData<T>
  onDelete: (value: ParamDelete<T>) => void
}

export type ParamFilter<T> = {
  value: IOption | IOption[] | null
  keyName: keyof T
}

export type ParamDelete<DefaultFilter> = {
  keyName: keyof DefaultFilter
  value: string
}

export type TooltipFilterProps<T, Key extends keyof T> = {
  keyName: Key
  Node: (nodeParams: FilterCommonProp<T[Key]>) => ReactNode
  title: string
  control: ControlFilter<T>
}

export type TooltipDateRangeFilterProps<
  T,
  KeyFrom extends keyof T,
  KeyTo extends keyof T,
> = {
  keyNameTo: KeyTo
  keyNameFrom: KeyFrom
  Node: (
    nodeParams: FilterDateRangeCommonProp<T[KeyFrom], T[KeyTo]>
  ) => ReactNode
  title: string
  control: ControlFilter<T>
}

export type FilterDateRangeCommonProp<From, To> = {
  fromValue: string
  toValue: string
  onFilterFrom: (form: ConditionValue<From> | null) => void
  onFilterTo: (to: ConditionValue<To> | null) => void
}

export type FilterCommonProp<Value> = {
  value: string[] | string
  onFilter: (value: ConditionValue<Value> | null) => void
}

export type IPagination = {
  page: number
  perPage: number
}

export type ISorting = {
  direction: 'ASC' | 'DESC'
  field: string
}

export type SortState = {
  state: 'DEFAULT' | 'ASC' | 'DESC'
  field: string
}

export interface IUseCustomCommonTable {
  search?: ISearchData
  filters?: BaseRecord
  perPage?: number
  orderBy?: ISorting
}
