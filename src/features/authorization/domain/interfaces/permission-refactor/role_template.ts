import { GenerateAction } from '.'

export const ROLE_TEMPLATE_ACTIONS = {
  VIEW: 'GetRole,GetAllRoles',
  CREATE: 'CreateRole',
  DELETE: 'DeleteRole',
  EDIT: 'UpdateRole',
}
export interface RoleTemplatePermissions
  extends GenerateAction<keyof typeof ROLE_TEMPLATE_ACTIONS> {}
