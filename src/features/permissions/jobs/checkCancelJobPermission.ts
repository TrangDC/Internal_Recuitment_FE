import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'

type CheckCancelJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  isOwner: boolean
}

function checkCancelJobPermission({
  role,
  inTeam,
  isOwner,
}: CheckCancelJobPermissionParams) {
  const cancelJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CANCEL_JOB.everything',
        'CANCEL_JOB.ownedOnly',
        'CANCEL_JOB.teamOnly',
      ],
    },
    module: 'JOBS',
  })

  const cancelJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CANCEL_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const cancelJobOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CANCEL_JOB.ownedOnly'],
    },
    module: 'JOBS',
  })

  if (!cancelJobPermission) return false
  if (cancelJobTeamOnly && !inTeam) return false
  if (cancelJobOwnedOnly && !isOwner) return false
  return true
}

export default checkCancelJobPermission
