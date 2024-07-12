import { GenerateAction } from '.'

export const EMAIL_TEMPLATE_ACTIONS = {
  VIEW: 'GetEmail,GetAllEmail',
  CREATE: 'CreateEmail',
  DELETE: 'DeleteEmail',
  EDIT: 'UpdateEmail',
}
export interface EmailTemplatePermissions
  extends GenerateAction<keyof typeof EMAIL_TEMPLATE_ACTIONS> {}
