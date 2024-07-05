import { GenerateAction } from '.'

export const SKILL_TYPE_ACTIONS = {
  VIEW: 'GetSkillType,GetAllSkillTypes',
  CREATE: 'CreateSkillType',
  EDIT: 'UpdateSkillType',
  DELETE: 'DeleteSkillType',
}
export interface SkillTypePermissions
  extends GenerateAction<keyof typeof SKILL_TYPE_ACTIONS> {}
