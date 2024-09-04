import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { HiringJobStatus } from 'shared/schema/database/hiring_job'
import checkEditApprovalJobPermission from './checkEditApprovalJobPermission'
import checkEditRequestJobPermission from './checkEditRequestJobPermission'

type CheckEditApprovalAndOpenJobPermissionParams = {
  inTeam: boolean
  role: PermissionStructureImpl | null
  status: HiringJobStatus
  isOwner: boolean
}

function checkEditApprovalAndOpenJobPermission({
  inTeam,
  isOwner,
  role,
  status,
}: CheckEditApprovalAndOpenJobPermissionParams) {
  const hasEditOpenJobPermission = checkEditRequestJobPermission({
    inTeam,
    isOwner,
    role,
    status,
  })

  const hasEditApprovalPermission = checkEditApprovalJobPermission({
    inTeam,
    isOwner,
    role,
    status,
  })

  return hasEditOpenJobPermission || hasEditApprovalPermission
}

export default checkEditApprovalAndOpenJobPermission
