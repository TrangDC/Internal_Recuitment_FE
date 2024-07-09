import { SKILL_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/skills'
import { GenerateActionCustomPermission } from '../permissionStructure'

export interface SkillTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof SKILL_ACTIONS> {}
