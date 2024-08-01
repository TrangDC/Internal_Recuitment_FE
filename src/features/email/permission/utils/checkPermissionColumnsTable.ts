import { ColumnDef } from '@tanstack/react-table'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import EmailTemplate from 'shared/schema/database/email_template'
interface ActionProps {
  newActions: ColumnDef<EmailTemplate, any>[]
  role: PermissionStructureImpl | null
}

type CheckPermissionColumnsTableProps = {
  role: PermissionStructureImpl | null
  me: MyBasicInformation | null
  columns: ColumnDef<EmailTemplate, any>[]
}

function checkPermissionColumnsTable({
  role,
  columns,
}: CheckPermissionColumnsTableProps): ColumnDef<EmailTemplate, any>[] {
  let newActions = [...columns]
  newActions = changeStatusAction({ newActions, role })
  return newActions
}

function changeStatusAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.everything'],
    },
    module: 'EMAIL_TEMPLATE',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== 'changeStatusEmail')
  return newActions
}

export default checkPermissionColumnsTable
