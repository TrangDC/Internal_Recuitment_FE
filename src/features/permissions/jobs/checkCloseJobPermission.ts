import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'

type CheckCloseJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  isRequester: boolean
  isRecInCharge: boolean
}

function checkCloseJobPermission({
  role,
  inTeam,
  isRecInCharge,
  isRequester,
}: CheckCloseJobPermissionParams) {
  const closeJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'CLOSE_JOB.everything',
        'CLOSE_JOB.ownedOnly',
        'CLOSE_JOB.teamOnly',
      ],
    },
    module: 'JOBS',
  })

  const closeJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const closeJobOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CLOSE_JOB.ownedOnly'],
    },
    module: 'JOBS',
  })
  if (!closeJobPermission) return false
  if (closeJobTeamOnly && !inTeam) return false
  if (closeJobOwnedOnly && !isRecInCharge && !isRequester) return false
  return true
}

export default checkCloseJobPermission
