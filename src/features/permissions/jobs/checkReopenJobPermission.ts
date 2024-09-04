import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'

type CheckReopenJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  isOwner: boolean
}

function checkReopenJobPermission({
  role,
  inTeam,
  isOwner,
}: CheckReopenJobPermissionParams) {
  const reopenJobPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'REOPEN_JOB.everything',
        'REOPEN_JOB.ownedOnly',
        'REOPEN_JOB.teamOnly',
      ],
    },
    module: 'JOBS',
  })

  const reopenJobTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['REOPEN_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const reopenJobOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['REOPEN_JOB.ownedOnly'],
    },
    module: 'JOBS',
  })

  if (!reopenJobPermission) return false
  if (reopenJobTeamOnly && !inTeam) return false
  if (reopenJobOwnedOnly && !isOwner) return false
  return true
}

export default checkReopenJobPermission
