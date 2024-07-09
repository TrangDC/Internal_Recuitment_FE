import { JOBS_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/jobs'
import { GenerateActionCustomPermission } from '../permissionStructure'

interface JobsTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof JOBS_ACTIONS> {}

export default JobsTemplatePermission
