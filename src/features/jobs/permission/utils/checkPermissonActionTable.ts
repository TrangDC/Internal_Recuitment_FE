import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Job } from 'features/jobs/domain/interfaces'
import { ActionAllJobsTable } from 'features/jobs/presentation/providers/hooks/table/useAllJobsPermissionActionTable'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Job>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<Job>): TOptionItem<Job>[] {
  let newActions = [...actions]
  const job = rowData.row.original
  const inTeam = me?.teamId === job.team.id
  newActions = editAction({ newActions, inTeam, role })
  newActions = deleteAction({ newActions, inTeam, role })
  newActions = closeJobsAction({ newActions, inTeam, role })
  return newActions
}

function editAction({ newActions, inTeam, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly', 'EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'JOBS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionAllJobsTable.EDIT)
  if (editTeamOnly && !inTeam)
    return newActions.filter((action) => action.id !== ActionAllJobsTable.EDIT)
  return newActions
}

function deleteAction({ newActions, role, inTeam }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'CREATE.ownedOnly', 'DELETE.teamOnly'],
    },
    module: 'JOBS',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!deletePermission)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.DELETE
    )
  if (deleteTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.DELETE
    )
  return newActions
}

function closeJobsAction({ newActions, role, inTeam }: ActionProps) {
  const closeJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CLOSE_JOB.everything',
        'CLOSE_JOB.ownedOnly',
        'CLOSE_JOB.teamOnly',
      ],
    },
    module: 'JOBS',
  })

  const closeJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!closeJobPermission)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CLOSE_JOB
    )
  if (closeJobTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CLOSE_JOB
    )
  return newActions
}

export default checkPermissionActionTable
