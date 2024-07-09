import { GenerateActionCustomPermission } from '../permissionStructure'
import { CANDIDATE_JOB_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/candidate_job'

interface CandidateJobTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof CANDIDATE_JOB_ACTIONS> {}

export default CandidateJobTemplatePermission
