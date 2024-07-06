import { ColumnDef } from '@tanstack/react-table'
import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

export type ParamsColumn = {
  role: PermissionStructureImpl | null
  me: MyBasicInformation
}

export interface IuseBuildColumnTable<T> {
  actions: TOptionItem<T>[],
  columns: (
    actions: TOptionItem<T>[],
    params: ParamsColumn
  ) => ColumnDef<T, any>[]
}

const useBuildColumnTable = <T extends object>({
  columns,
  actions
}: IuseBuildColumnTable<T>) => {
  const { role, user } = useAuthorization()
  return {
    columnTable: columns(actions, {
      role,
      me: user,
    }),
  }
}

export default useBuildColumnTable
