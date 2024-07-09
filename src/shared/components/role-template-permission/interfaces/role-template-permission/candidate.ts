import { CANDIDATE_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/candidate'
import { GenerateActionCustomPermission } from '../permissionStructure'

interface CandidateTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof CANDIDATE_ACTIONS> {}

export default CandidateTemplatePermission
