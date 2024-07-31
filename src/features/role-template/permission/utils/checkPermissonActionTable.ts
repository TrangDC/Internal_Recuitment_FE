import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionRoleTemplates } from 'features/role-template/hooks/table/useBuildActionsTableRoleTemplate'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import Role from 'shared/schema/database/role'

interface ActionProps {
  newActions: TOptionItem<Role>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<Role>): TOptionItem<Role>[] {
  let newActions = [...actions]
  newActions = editAction({ newActions, role })
  newActions = deleteAction({ newActions, role })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'ROLES_TEMPLATE',
  })

  if (!everything)
    return newActions.filter((action) => action.id !== ActionRoleTemplates.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'ROLES_TEMPLATE',
  })

  if (!everything)
    return newActions.filter(
      (action) => action.id !== ActionRoleTemplates.DELETE
    )
  return newActions
}

export default checkPermissionActionTable
