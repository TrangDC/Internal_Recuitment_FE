import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionsTableEmail } from 'features/email/hooks/useBuildActionsTableEmail'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import EmailTemplate from 'shared/schema/database/email_template'
interface ActionProps {
  newActions: TOptionItem<EmailTemplate>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<EmailTemplate>): TOptionItem<EmailTemplate>[] {
  let newActions = [...actions]
 
  newActions = editAction({ newActions, role })
  newActions = deleteAction({ newActions, role })

  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'EMAIL_TEMPLATE',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionsTableEmail.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'EMAIL_TEMPLATE',
  })

  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionsTableEmail.DELETE)
  return newActions
}

export default checkPermissionActionTable
