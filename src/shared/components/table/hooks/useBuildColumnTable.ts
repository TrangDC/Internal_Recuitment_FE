import { ColumnDef } from '@tanstack/react-table'
import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { intersection, remove, union } from 'lodash'
import { useState } from 'react'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

export type ParamsColumn = {
  role: PermissionStructureImpl | null
  me: MyBasicInformation
  handleOpenDetail?: (id: string) => void
  rowSelected: string[]
  addRowSelected: (selected: string | string[]) => void
  removeSelected: (selected: string | string[]) => void
  isBelongRowSelected: (string: string[]) => {
    checked: boolean,
    indeterminate: boolean,
  }
}

export interface IuseBuildColumnTable<T> {
  actions: TOptionItem<T>[]
  handleOpenDetail?: (id: string) => void
  columns: (
    actions: TOptionItem<T>[],
    params: ParamsColumn
  ) => ColumnDef<T, any>[]
}

const useBuildColumnTable = <T extends object>({
  columns,
  actions,
  handleOpenDetail,
}: IuseBuildColumnTable<T>) => {
  const { role, user } = useAuthorization()
  const [rowSelected, setRowSelected] = useState<string[]>([]);

  function addRowSelected (item: string | string[]) {
    setRowSelected((prev) => {
      return typeof item === 'string' ? union(prev, [item]) : union(prev, item);
    })
  }

  function removeSelected (item: string | string[]) {
    const listRemove = typeof item === 'string' ? [item] : item;
    setRowSelected((prev) => {
      return remove(prev, (row) => {
        return !listRemove.includes(row)
      })
    }) 
  }

  function isBelongRowSelected (item: string[]) {
    //check row selected same
    const intersectionRow = intersection(rowSelected, item);
    return {
      checked: intersectionRow.length === item.length && item.length > 0,
      indeterminate: intersectionRow.length > 0 && intersectionRow.length < item.length,
    };
  }
  
  return {
    columnTable: columns(actions, {
      role,
      me: user,
      handleOpenDetail,
      rowSelected,
      addRowSelected,
      removeSelected,
      isBelongRowSelected
    }),
    rowSelected
  }
}

export default useBuildColumnTable
