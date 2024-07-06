import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { User } from 'features/calendars/domain/interfaces'
import DeleteIcon from 'shared/components/icons/DeleteIcon'

type DeleteInterviewButtonPermissionProps = {
  onClick: () => void
  candidateJobOfTeamId: string
  interviewers: User[]
}

function DeleteInterviewButtonPermission({
  onClick,
  candidateJobOfTeamId,
  interviewers,
}: DeleteInterviewButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === candidateJobOfTeamId
  const isInterviewer = !!interviewers.find(
    (interviewer) => interviewer.id === user?.id
  )

  const deleteEverything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'DELETE.teamOnly', 'DELETE.ownedOnly'],
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

  if (!deleteEverything) return null
  if (deleteTeamOnly && !inTeam) return null
  if (deleteOwnerOnly && !isInterviewer) return null
  return (
    <DeleteIcon
      onClick={onClick}
      sx={{
        fontSize: '20px',
      }}
    />
  )
}

export default DeleteInterviewButtonPermission
