import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import AppButton from 'shared/components/buttons/AppButton'
import EditIcon from 'shared/components/icons/EditIcon'

type EditApplicationButtonPermissionProps = {
  onClick: () => void
  candidateJobOfTeamId: string
}

function EditApplicationButtonPermission({
  onClick,
  candidateJobOfTeamId,
}: EditApplicationButtonPermissionProps) {
  const { user, role } = useAuthorization()
  const inTeam = user?.teamId === candidateJobOfTeamId

  const hasPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  const ediTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })
  if (!hasPermission) return null
  if (ediTeamOnly && !inTeam) return null
  return (
    <AppButton
      onClick={onClick}
      variant="outlined"
      startIcon={
        <EditIcon
          sx={{
            ' path': {
              fill: '#1F84EB',
            },
          }}
        />
      }
    >
      Edit application
    </AppButton>
  )
}

export default EditApplicationButtonPermission
