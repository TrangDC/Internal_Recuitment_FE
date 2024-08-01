import { ColumnDef } from '@tanstack/react-table'
import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

export type ParamsColumn = {
  role: PermissionStructureImpl | null
  me: MyBasicInformation
  handleOpenDetail?: (id: string) => void
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
  return {
    columnTable: columns(actions, {
      role,
      me: user,
      handleOpenDetail,
    }),
  }
}

export default useBuildColumnTable
