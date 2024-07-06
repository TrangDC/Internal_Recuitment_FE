import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import DeleteIcon from 'shared/components/icons/DeleteIcon'

type DeleteFeedbackButtonPermissionProps = {
  onClick: () => void
  ownerId: string
}

function DeleteFeedbackButtonPermission({
  onClick,
  ownerId,
}: DeleteFeedbackButtonPermissionProps) {
  const { user, role } = useAuthorization()
  const isOwner = user?.id === ownerId
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
  if (deleteOwnerOnly && !isOwner) return null
  // if (deleteTeamOnly && !isOwner) return null

  return <DeleteIcon onClick={onClick} />
}

export default DeleteFeedbackButtonPermission
