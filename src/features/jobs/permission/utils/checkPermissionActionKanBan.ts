import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { ActionJobsKanbanTable } from 'features/jobs/hooks/table/useBuildActionsKanbanJobs'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<CandidateStatusItem>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
}

interface CheckPermissionActionKanBanProps
  extends Omit<
    CheckPermissionActionTableProps<CandidateStatusItem>,
    'rowData'
  > {
  rowData: CandidateStatusItem
}

function checkPermissionActionKanBan({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionKanBanProps): TOptionItem<CandidateStatusItem>[] {
  let newActions = [...actions]
  const jobOfTeamId = rowData?.hiring_job?.team?.id ?? ''
  const inTeam = me?.teamId === jobOfTeamId
  newActions = editAction({ newActions, inTeam, role })
  newActions = deleteAction({ newActions, inTeam, role })
  return newActions
}

function editAction({ newActions, inTeam, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly', 'EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })
  if (!editPermission)
    return newActions.filter(
      (action) => action.id !== ActionJobsKanbanTable.EDIT
    )
  if (editTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionJobsKanbanTable.EDIT
    )
  return newActions
}

function deleteAction({ newActions, role, inTeam }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'CREATE.ownedOnly', 'DELETE.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })
  if (!deletePermission)
    return newActions.filter(
      (action) => action.id !== ActionJobsKanbanTable.DELETE
    )
  if (deleteTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionJobsKanbanTable.DELETE
    )
  return newActions
}

export default checkPermissionActionKanBan
