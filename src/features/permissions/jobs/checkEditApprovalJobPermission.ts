import { checkPermissions } from 'features/authorization/domain/functions/functions'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { HiringJobStatus } from 'shared/schema/database/hiring_job'

type CheckEditApprovalJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  status: HiringJobStatus
  isOwner: boolean
}

function checkEditApprovalJobPermission({
  inTeam,
  role,
  status,
  isOwner,
}: CheckEditApprovalJobPermissionParams) {
  const editAllPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: [
        'EDIT_PENDING_APPROVAL.everything',
      ],
    },
    module: 'JOBS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT_PENDING_APPROVAL.teamOnly'],
    },
    module: 'JOBS',
  })

  const editOwnerOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT_PENDING_APPROVAL.ownedOnly'],
    },
    module: 'JOBS',
  })
  if (editAllPermission && status === 'pending_approvals') return true
  if (editTeamOnly && inTeam && status === 'pending_approvals') return true
  if (editOwnerOnly && isOwner && status === 'pending_approvals') return true
  return false
}

export default checkEditApprovalJobPermission
