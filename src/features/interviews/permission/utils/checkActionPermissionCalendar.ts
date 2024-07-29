import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Interview } from 'features/interviews/domain/interfaces'
import { ActionInterview } from 'features/interviews/hooks/table/useBuildActionsTableInterview'
import { Member } from 'features/teams/domain/interfaces'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Interview>[]
  inTeam: boolean
  role: PermissionStructureImpl | null
  isInterviewer: boolean
}

function checkActionPermissionInterview({
  role,
  me,
  actions,
  candidateJobOfTeamId,
  interviewer,
}: Omit<CheckPermissionActionTableProps<Interview>, 'rowData'> & {
  interviewer: Member[]
  candidateJobOfTeamId: string
}): TOptionItem<Interview>[] {
  let newActions = [...actions]
  const inTeam = me?.teamId === candidateJobOfTeamId
  const interviewers = interviewer

  const isInterviewer = !!interviewers.find(
    (interviewer) => interviewer.id === me?.id
  )

  newActions = editAction({ newActions, inTeam, role, isInterviewer })
  newActions = deleteAction({ newActions, inTeam, role, isInterviewer })
  newActions = changeStatusAction({ newActions, inTeam, role, isInterviewer })
  return newActions
}

function editAction({ newActions, inTeam, role, isInterviewer }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything', 'EDIT.ownedOnly', 'EDIT.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const editOwnerOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly'],
    },
    module: 'INTERVIEWS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'INTERVIEWS',
  })
  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionInterview.EDIT)
  if (editTeamOnly && !inTeam)
    return newActions.filter((action) => action.id !== ActionInterview.EDIT)
  if (editOwnerOnly && !isInterviewer)
    return newActions.filter((action) => action.id !== ActionInterview.EDIT)
  return newActions
}

function deleteAction({
  newActions,
  role,
  inTeam,
  isInterviewer,
}: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'CREATE.ownedOnly', 'DELETE.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const deleteOwnerOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.ownedOnly'],
    },
    module: 'INTERVIEWS',
  })
  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionInterview.DELETE)
  if (deleteTeamOnly && !inTeam)
    return newActions.filter((action) => action.id !== ActionInterview.DELETE)
  if (deleteOwnerOnly && !isInterviewer)
    return newActions.filter((action) => action.id !== ActionInterview.DELETE)
  return newActions
}

function changeStatusAction({
  newActions,
  role,
  inTeam,
  isInterviewer,
}: ActionProps) {
  const changeStatusPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CHANGE_INTERVIEW.everything',
        'CHANGE_INTERVIEW.ownedOnly',
        'CHANGE_INTERVIEW.teamOnly',
      ],
    },
    module: 'INTERVIEWS',
  })

  const changeStatusTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_INTERVIEW.teamOnly'],
    },
    module: 'INTERVIEWS',
  })

  const changeStatusOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_INTERVIEW.ownedOnly'],
    },
    module: 'INTERVIEWS',
  })
  if (!changeStatusPermission)
    return newActions.filter(
      (action) =>
        action.id !== ActionInterview.DONE &&
        action.id !== ActionInterview.CANCEL
    )
  if (changeStatusTeamOnly && !inTeam)
    return newActions.filter(
      (action) =>
        action.id !== ActionInterview.DONE &&
        action.id !== ActionInterview.CANCEL
    )
  if (changeStatusOwnedOnly && !isInterviewer)
    return newActions.filter(
      (action) =>
        action.id !== ActionInterview.DONE &&
        action.id !== ActionInterview.CANCEL
    )
  return newActions
}

export default checkActionPermissionInterview
