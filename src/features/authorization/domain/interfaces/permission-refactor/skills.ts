import { GenerateAction } from '.'

export const SKILL_ACTIONS = {
  VIEW: 'GetSkill,GetAllSkills',
  CREATE: 'CreateSkill',
  EDIT: 'UpdateSkill',
  DELETE: 'DeleteSkill',
}
export interface SkillPermissions
  extends GenerateAction<keyof typeof SKILL_ACTIONS> {}
