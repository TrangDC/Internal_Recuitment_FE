import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { HiringJobStatus } from 'shared/schema/database/hiring_job'

type CheckEditRequestJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  status: HiringJobStatus
  isOwner: boolean
}

function checkEditRequestJobPermission({
  inTeam,
  isOwner,
  role,
  status,
}: CheckEditRequestJobPermissionParams) {
  const editAllPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT_OPENING_JOB.everything'],
    },
    module: 'JOBS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT_OPENING_JOB.teamOnly'],
    },
    module: 'JOBS',
  })

  const editOwnerOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT_OPENING_JOB.ownedOnly'],
    },
    module: 'JOBS',
  })
  if (editAllPermission && status === 'opened') return true
  if (editTeamOnly && inTeam && status === 'opened') return true
  if (editOwnerOnly && isOwner && status === 'opened') return true
  return false
}

export default checkEditRequestJobPermission
