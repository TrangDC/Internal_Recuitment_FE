import { SKILL_TYPE_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/skill_type'
import { GenerateActionCustomPermission } from '../permissionStructure';

export interface SkillTypeTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof SKILL_TYPE_ACTIONS> {}
