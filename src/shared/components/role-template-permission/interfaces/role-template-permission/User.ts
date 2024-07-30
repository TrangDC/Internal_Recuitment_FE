import { GenerateActionCustomPermission } from '../permissionStructure'
import { USER_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/user'

export interface UserTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof USER_ACTIONS> {}
