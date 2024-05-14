import { ColumnDef } from '@tanstack/react-table'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

export interface IuseBuildColumnTable<T> {
  actions: TOptionItem<T>[]
  columns: (actions: TOptionItem<T>[]) => ColumnDef<T, any>[]
}

const useBuildColumnTable = <T extends object>({
  actions,
  columns,
}: IuseBuildColumnTable<T>) => {

  return {
    colummTable: columns(actions),
  }
}

export default useBuildColumnTable
