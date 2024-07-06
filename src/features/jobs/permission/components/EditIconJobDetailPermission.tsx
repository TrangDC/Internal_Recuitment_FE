import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { Job } from 'features/jobs/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'

type EditIconJobDetailPermissionProps = {
  onClick: () => void
  job_detail: Job
}

function EditIconJobDetailPermission({
  onClick,
  job_detail,
}: EditIconJobDetailPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === job_detail.team?.id
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly', 'EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'JOBS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'JOBS',
  })
  if (!editPermission) return null
  if (editTeamOnly && !inTeam) return null
  return (
    <EditIcon
      sx={{
        height: '24px',
        width: '24px',
        color: '#82868C',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  )
}

export default EditIconJobDetailPermission
