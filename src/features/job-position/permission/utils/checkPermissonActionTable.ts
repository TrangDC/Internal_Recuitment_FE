import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionsTableJobPosition } from 'features/job-position/hooks/useBuildActionsTableJobPosition'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import JobPosition from 'shared/schema/database/job_position'

interface ActionProps {
  newActions: TOptionItem<JobPosition>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<JobPosition>): TOptionItem<JobPosition>[] {
  let newActions = [...actions]

  newActions = detailAction({ newActions, role })
  newActions = editAction({ newActions, role })
  newActions = deleteAction({ newActions, role })

  return newActions
}

function detailAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['VIEW.everything'],
    },
    module: 'JOB_POSITION',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionsTableJobPosition.EDIT)
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'JOB_POSITION',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionsTableJobPosition.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'JOB_POSITION',
  })

  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionsTableJobPosition.DELETE)
  return newActions
}

export default checkPermissionActionTable
