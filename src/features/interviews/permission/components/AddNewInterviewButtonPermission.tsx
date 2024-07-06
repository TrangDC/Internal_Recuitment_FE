import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'

type AddNewInterViewButtonPermissionProps = {
  onClick: () => void
  candidateJobOfTeamId: string
}

function AddNewInterviewButtonPermission({
  onClick,
  candidateJobOfTeamId,
}: AddNewInterViewButtonPermissionProps) {
  const { role, user } = useAuthorization()
  const inTeam = user?.teamId === candidateJobOfTeamId
  const createInterview = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CREATE.everything', 'CREATE.teamOnly', 'CREATE.ownedOnly'],
    },
    module: 'INTERVIEWS',
  })
  const createTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CREATE.teamOnly'],
    },
    module: 'INTERVIEWS',
  })
  if (!createInterview) return null
  if (createTeamOnly && !inTeam) return null
  return (
    <Button startIcon={<Add />} onClick={onClick}>
      Add new interview
    </Button>
  )
}

export default AddNewInterviewButtonPermission
