import { ReactNode } from 'react'
import PermissionStructureImpl, { CheckActions } from './permission-refactor'

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
