import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionJobsOpen } from 'features/user/hooks/table/useBuildActionsTableUser'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import User from 'shared/schema/database/user'

interface ActionProps {
  newActions: TOptionItem<User>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<User>): TOptionItem<User>[] {
  let newActions = [...actions]
  newActions = editAction({ newActions, role })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'HIRING_TEAMS',
  })

  if (!everything)
    return newActions.filter((action) => action.id !== ActionJobsOpen.EDIT)
  return newActions
}

export default checkPermissionActionTable
