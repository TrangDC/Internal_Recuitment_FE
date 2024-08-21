import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionCandidateNote } from 'features/candidates/hooks/candidate-activity/actions/useBuildActionCandidateNote'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import CandidateNote from 'shared/schema/database/candidate_note'

interface ActionProps {
  newActions: TOptionItem<CandidateNote>[]
  role: PermissionStructureImpl | null
  inTeam: boolean
  isOwner: boolean
}

function checkPermissionCandidateNote({
  role,
  actions,
  me,
  candidateNote,
}: Omit<CheckPermissionActionTableProps<CandidateNote>, 'rowData'> & {
  candidateNote: CandidateNote
}): TOptionItem<CandidateNote>[] {
  const inTeam = me?.teamId === candidateNote.created_by?.hiring_team?.id
  const isOwner = me?.id === candidateNote.created_by.id
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
    return newActions.filter((action) => action.id !== ActionCandidateNote.EDIT)
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
    return newActions.filter(
      (action) => action.id !== ActionCandidateNote.DELETE
    )
  if (deleteTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionCandidateNote.DELETE
    )
  return newActions
}

export default checkPermissionCandidateNote
