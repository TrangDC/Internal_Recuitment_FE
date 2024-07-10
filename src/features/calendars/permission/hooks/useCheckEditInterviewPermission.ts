import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import User from 'shared/schema/database/user'

interface HandleCheckPermissionProps {
  candidateJobOfTeamId: string
  interviewers: User[]
}

function useCheckEditInterviewPermission() {
  const { role, user } = useAuthorization()
  function handleCheckPermission(params: HandleCheckPermissionProps) {
    const { candidateJobOfTeamId, interviewers } = params
    const inTeam = user?.teamId === candidateJobOfTeamId
    const isInterviewer = !!interviewers.find(
      (interviewer) => interviewer.id === user?.id
    )

    const editEverything = checkPermissions({
      role,
      checkBy: {
        compare: 'hasAny',
        permissions: ['EDIT.everything', 'EDIT.teamOnly', 'EDIT.ownedOnly'],
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
    if (!editEverything) return false
    if (editTeamOnly && !inTeam) return false
    if (editOwnerOnly && !isInterviewer) return false
    return true
  }
  return {
    handleCheckPermission,
  }
}

export default useCheckEditInterviewPermission
