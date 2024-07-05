import {
  DefineActionTable,
  ICheckPermissions,
} from 'features/authorization/domain/interfaces'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import { useAuthorization } from './useAuthorization'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from '../domain/interfaces/permission-refactor'

interface IusePermissionActionTable<K extends string, T> {
  actions: DefineActionTable<K, T>
  permissionActions: (
    actions: PermissionActionsProps<T>,
    utils: IPermissionUtils<K, T>
  ) => TOptionItem<T>[]
}

interface PermissionActionsProps<T> {
  actions: TOptionItem<T>[]
  role: PermissionStructureImpl | null
}

interface IPermissionUtils<K extends string, T> {
  removeAction: (newActionTable: TOptionItem<T>[], key: K[]) => TOptionItem<T>[]
  checkPermissions: <M extends keyof PermissionStructureImpl>(
    props: ICheckPermissions<M>
  ) => boolean
}

interface IusePermissionActionTableReturn<K, T> {
  actions: TOptionItem<T>[]
  role: PermissionStructureImpl | null
}

export function usePermissionActionTable<K extends string, T>(
  props: IusePermissionActionTable<K, T>
): IusePermissionActionTableReturn<K, T> {
  const { actions, permissionActions } = props
  const { role } = useAuthorization()
  const newActionTable: TOptionItem<T>[] = Object.keys(actions).map((key) => {
    const typedKey = key as K
    const item = actions[typedKey]
    return {
      ...item,
    }
  })

  function removeAction(newActionTable: TOptionItem<T>[], key: K[]) {
    return newActionTable.filter((item) => !key.includes(item.id as K))
  }
  const utils: IPermissionUtils<K, T> = {
    removeAction,
    checkPermissions,
  }

  const permissionActionsProps = {
    actions: newActionTable,
    role,
  }
  return {
    actions: permissionActions(permissionActionsProps, utils),
    role,
  }
}
