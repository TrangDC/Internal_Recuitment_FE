import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionHistoryCall } from 'features/candidates/hooks/candidate-activity/actions/useBuildActionHistoryCall'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'

interface ActionProps {
  newActions: TOptionItem<CandidateHistoryCall>[]
  role: PermissionStructureImpl | null
  inTeam: boolean
  isOwner: boolean
}

function checkPermissionCandidateHistoryCall({
  role,
  actions,
  me,
  candidateHistoryCall,
}: Omit<CheckPermissionActionTableProps<CandidateHistoryCall>, 'rowData'> & {
  candidateHistoryCall: CandidateHistoryCall
}): TOptionItem<CandidateHistoryCall>[] {
  const inTeam = me?.teamId === candidateHistoryCall.created_by?.hiring_team?.id
  const isOwner = me?.id === candidateHistoryCall.created_by.id
  let newActions = [...actions]
  newActions = editAction({ newActions, role, inTeam, isOwner })
  newActions = deleteAction({ newActions, role, inTeam, isOwner })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly', 'EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'CANDIDATE_ACTIVITIES',
  })
  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionHistoryCall.EDIT)
  return newActions
}

function deleteAction({ newActions, role, inTeam }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'DELETE.ownedOnly', 'DELETE.teamOnly'],
    },
    module: 'CANDIDATE_ACTIVITIES',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'CANDIDATE_ACTIVITIES',
  })

  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionHistoryCall.DELETE)
  if (deleteTeamOnly && !inTeam)
    return newActions.filter((action) => action.id !== ActionHistoryCall.DELETE)
  return newActions
}

export default checkPermissionCandidateHistoryCall
