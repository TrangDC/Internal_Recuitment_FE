import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionAllJobsTable } from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import { ACTION_JOB_BY_STATUS } from 'features/jobs/shared/constants'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import HiringJob from 'shared/schema/database/hiring_job'

interface ActionProps {
  newActions: TOptionItem<HiringJob>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
  job: HiringJob
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<HiringJob>): TOptionItem<HiringJob>[] {
  let newActions = [...actions]
  const job = rowData.row.original
  const inTeam = me?.teamId === job.hiring_team.id
  newActions = editAction({ newActions, inTeam, role, job })
  newActions = deleteAction({ newActions, inTeam, role, job })
  newActions = closeJobsAction({ newActions, inTeam, role, job })
  newActions = reopenJobsAction({ newActions, inTeam, role, job })
  newActions = cancelJobsAction({ newActions, inTeam, role, job })
  return newActions
}

function editAction({ newActions, inTeam, role, job }: ActionProps) {
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
  if (!ACTION_JOB_BY_STATUS.edit.includes(job.status)) {
    return newActions.filter((action) => action.id !== ActionAllJobsTable.EDIT)
  }
  return newActions
}

function deleteAction({ newActions, role, inTeam, job }: ActionProps) {
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
  if (!ACTION_JOB_BY_STATUS.delete.includes(job.status)) {
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.DELETE
    )
  }
  return newActions
}

function closeJobsAction({ newActions, role, inTeam, job }: ActionProps) {
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

  if (!ACTION_JOB_BY_STATUS.close.includes(job.status)) {
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CLOSE_JOB
    )
  }
  return newActions
}

function reopenJobsAction({ newActions, role, inTeam, job }: ActionProps) {
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
      (action) => action.id !== ActionAllJobsTable.REOPEN
    )
  if (closeJobTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.REOPEN
    )

  if (!ACTION_JOB_BY_STATUS.reopen.includes(job.status)) {
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.REOPEN
    )
  }
  return newActions
}

function cancelJobsAction({ newActions, role, inTeam, job }: ActionProps) {
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
      (action) => action.id !== ActionAllJobsTable.CANCEL
    )
  if (closeJobTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CANCEL
    )

  if (
    !ACTION_JOB_BY_STATUS.cancel.includes(job.status) ||
    !job.is_able_to_cancel
  ) {
    return newActions.filter(
      (action) => action.id !== ActionAllJobsTable.CANCEL
    )
  }
  return newActions
}

export default checkPermissionActionTable
