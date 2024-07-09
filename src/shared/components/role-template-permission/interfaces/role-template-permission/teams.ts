import { TEAM_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/team'
import { GenerateActionCustomPermission } from '../permissionStructure'

export interface TeamTemplatePermissions
  extends GenerateActionCustomPermission<keyof typeof TEAM_ACTIONS> {}
