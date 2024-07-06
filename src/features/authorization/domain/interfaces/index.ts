import { ReactNode } from 'react'
import PermissionStructureImpl, { CheckActions } from './permission-refactor'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import { CellContext } from '@tanstack/react-table'

export type DefineActionTable<A extends string, T> = {
  [Key in A]: {
    id: Key
    disabled?: boolean | ((rowData: T) => boolean)
    onClick?: (id: string, row: T) => void
    title?: string | ((rowData: T) => string)
    Icon: ReactNode
  }
}

export interface ICheckPermissions<M extends keyof PermissionStructureImpl> {
  role: PermissionStructureImpl | null
  module: M
  checkBy: CheckActions<M>
}

export interface CheckPermissionActionTableProps<T> {
  role: PermissionStructureImpl | null
  me: MyBasicInformation | null
  actions: TOptionItem<T>[]
  rowData: CellContext<T, any>
}


export type MyBasicInformation = {
  name: string
  email: string
  id: string
  teamId: string
} | null
