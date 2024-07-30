import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import EditIcon from 'shared/components/icons/EditIcon'
import User from 'shared/schema/database/user'

type EditInterviewButtonPermissionProps = {
  onClick: () => void
  candidateJobOfTeamId: string
  interviewers: User[]
}

function EditInterviewButtonPermission({
  onClick,
  candidateJobOfTeamId,
  interviewers,
}: EditInterviewButtonPermissionProps) {
  const { role, user } = useAuthorization()
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
  if (!editEverything) return null
  if (editTeamOnly && !inTeam) return null
  if (editOwnerOnly && !isInterviewer) return null
  return (
    <EditIcon
      onClick={onClick}
      sx={{
        fontSize: '20px',
      }}
    />
  )
}

export default EditInterviewButtonPermission
