import { ROLE_TEMPLATE_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/role_template'
import { GenerateActionCustomPermission } from '../permissionStructure';

export interface RoleTemplateTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof ROLE_TEMPLATE_ACTIONS> {}
