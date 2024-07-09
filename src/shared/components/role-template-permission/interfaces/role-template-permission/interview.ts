import { INTERVIEW_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/interview'
import { GenerateActionCustomPermission } from '../permissionStructure'

export interface InterviewTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof INTERVIEW_ACTIONS> {}
