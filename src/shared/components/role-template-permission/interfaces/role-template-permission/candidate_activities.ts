import { GenerateActionCustomPermission } from '../permissionStructure'
import { CANDIDATE_ACTIVITIES_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/candidate_actitvities'

interface CandidateActivitiesTemplatePermission
  extends GenerateActionCustomPermission<
    keyof typeof CANDIDATE_ACTIVITIES_ACTIONS
  > {}

export default CandidateActivitiesTemplatePermission
