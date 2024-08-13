import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import DeleteIcon from 'shared/components/icons/DeleteIcon'

type DeleteFeedbackButtonPermissionProps = {
  onClick: () => void
  ownerId: string
  feedbackOfTeamId: string
}

function DeleteFeedbackButtonPermission({
  onClick,
  ownerId,
  feedbackOfTeamId,
}: DeleteFeedbackButtonPermissionProps) {
  const { user, role } = useAuthorization()
  const isOwner = user?.id === ownerId
  const inTeam = user?.teamId === feedbackOfTeamId
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'DELETE.teamOnly', 'DELETE.ownedOnly'],
    },
    module: 'CANDIDATE_JOB_FEEDBACKS',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'CANDIDATE_JOB_FEEDBACKS',
  })

  const deleteOwnerOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.ownedOnly'],
    },
    module: 'CANDIDATE_JOB_FEEDBACKS',
  })

  if (!deletePermission) return null
  if (deleteTeamOnly && !inTeam) return null
  if (deleteOwnerOnly && !isOwner) return null
  return <DeleteIcon onClick={onClick} />
}

export default DeleteFeedbackButtonPermission
