import { GenerateAction } from '.'

export const EMAIL_TEMPLATE_ACTIONS = {
  VIEW: 'GetEmailTemplate,GetAllEmailTemplates',
  CREATE: 'CreateEmailTemplate',
  DELETE: 'DeleteEmailTemplate',
  EDIT: 'UpdateEmailTemplate',
}
export interface EmailTemplatePermissions
  extends GenerateAction<keyof typeof EMAIL_TEMPLATE_ACTIONS> {}
