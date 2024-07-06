import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { RoleTemplate } from 'features/role-template/domain/interfaces'
import { ActionRoleTemplates } from 'features/role-template/hooks/useBuildActionsTableRoleTemplate'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<RoleTemplate>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<RoleTemplate>): TOptionItem<RoleTemplate>[] {
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

  if (!everything) return newActions.filter((action) => action.id !== ActionRoleTemplates.EDIT)
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

  if (!everything) return newActions.filter((action) => action.id !== ActionRoleTemplates.DELETE)
  return newActions
}

export default checkPermissionActionTable
