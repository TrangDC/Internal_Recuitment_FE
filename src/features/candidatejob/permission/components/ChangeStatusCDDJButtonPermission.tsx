import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { ButtonStatus } from 'features/candidatejob/shared/styles'
import EditIcon from 'shared/components/icons/EditIcon'

type ChangeStatusCDDJButtonPermissionProps = {
  onClick: () => void
  candidateJobOfTeamId: string
}

function ChangeStatusCDDJButtonPermission({
  onClick,
  candidateJobOfTeamId,
}: ChangeStatusCDDJButtonPermissionProps) {
  const { user, role } = useAuthorization()
  const inTeam = user?.teamId === candidateJobOfTeamId

  const hasPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.everything', 'CHANGE_STATUS.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  const ediTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })
  if (!hasPermission) return null
  if (ediTeamOnly && !inTeam) return null
  return (
    <ButtonStatus
      onClick={onClick}
      variant="contained"
      startIcon={
        <EditIcon
          sx={{
            ' path': {
              fill: 'white',
            },
          }}
        />
      }
    >
      Change status
    </ButtonStatus>
  )
}

export default ChangeStatusCDDJButtonPermission
