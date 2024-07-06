import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'

interface CheckDragDropCandidateJobProps {
  role: PermissionStructureImpl | null
  me: MyBasicInformation
  candidateJobOfTeamId: string
}

function checkDragDropCandidateJob({
  role,
  me,
  candidateJobOfTeamId,
}: CheckDragDropCandidateJobProps): boolean {
  const inTeam = me?.teamId === candidateJobOfTeamId
  const hasPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.everything', 'CHANGE_STATUS.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })

  const changeStatusTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['CHANGE_STATUS.teamOnly'],
    },
    module: 'CANDIDATE_JOBS',
  })
  if (!hasPermission) return false
  if (changeStatusTeamOnly && !inTeam) return false
  return true
}

export default checkDragDropCandidateJob
