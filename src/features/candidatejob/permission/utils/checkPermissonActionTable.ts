import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionCandidateJobsTabLe } from 'features/candidatejob/hooks/table/useBuildActionTableCandidateJobs'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import CandidateJob from 'shared/schema/database/candidate_job'

interface ActionProps {
  newActions: TOptionItem<CandidateJob>[]
  role: PermissionStructureImpl | null
  inTeam: boolean
}

function checkPermissionActionTable({
  role,
  actions,
  me,
  rowData,
}: CheckPermissionActionTableProps<CandidateJob>): TOptionItem<CandidateJob>[] {
  const inTeam =
    me?.teamId === rowData.row.original?.hiring_job?.hiring_team?.id
  let newActions = [...actions]
  newActions = editAction({ newActions, role, inTeam })
  newActions = deleteAction({ newActions, role, inTeam })
  newActions = changeStatus({ newActions, role, inTeam })
  return newActions
}

function editAction({ newActions, role, inTeam }: ActionProps) {
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
      (action) => action.id !== ActionCandidateJobsTabLe.EDIT_CV
    )
  if (editTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionCandidateJobsTabLe.EDIT_CV
    )
  return newActions
}

function deleteAction({ newActions, role, inTeam }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'DELETE.ownedOnly', 'DELETE.teamOnly'],
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
      (action) => action.id !== ActionCandidateJobsTabLe.DELETE
    )
  if (deleteTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionCandidateJobsTabLe.DELETE
    )
  return newActions
}

function changeStatus({ newActions, role, inTeam }: ActionProps) {
  const changeStatusPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CHANGE_STATUS.everything',
        'CHANGE_STATUS.ownedOnly',
        'CHANGE_STATUS.teamOnly',
      ],
    },
    module: 'CANDIDATE_JOBS',
  })

  const changeStatusTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  if (!changeStatusPermission)
    return newActions.filter(
      (action) => action.id !== ActionCandidateJobsTabLe.CHANGE_STATUS
    )
  if (changeStatusTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionCandidateJobsTabLe.CHANGE_STATUS
    )
  return newActions
}

export default checkPermissionActionTable
