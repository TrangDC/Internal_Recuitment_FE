import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'

type CheckDeleteJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  isOwner: boolean
}

function checkDeleteJobPermission({
  role,
  inTeam,
  isOwner,
}: CheckDeleteJobPermissionParams) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything', 'DELETE.ownedOnly', 'DELETE.teamOnly'],
    },
    module: 'JOBS',
  })

  const deleteTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.teamOnly'],
    },
    module: 'JOBS',
  })

  const deleteOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.ownedOnly'],
    },
    module: 'JOBS',
  })
  if (!deletePermission) return false
  if (deleteTeamOnly && !inTeam) return false
  if (deleteOwnedOnly && !isOwner) return false
  return true
}

export default checkDeleteJobPermission
