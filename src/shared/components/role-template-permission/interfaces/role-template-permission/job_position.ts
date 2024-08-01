import { JOB_POSITION_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/job_position'
import { GenerateActionCustomPermission } from '../permissionStructure'

interface JobPositionTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof JOB_POSITION_ACTIONS> {}

export default JobPositionTemplatePermission
