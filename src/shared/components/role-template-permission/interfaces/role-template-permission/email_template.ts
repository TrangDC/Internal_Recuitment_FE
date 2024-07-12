import { GenerateActionCustomPermission } from '../permissionStructure';
import { EMAIL_TEMPLATE_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/email_template';

export interface EmailTemplateTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof EMAIL_TEMPLATE_ACTIONS> {}
