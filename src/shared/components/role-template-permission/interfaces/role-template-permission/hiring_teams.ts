import { GenerateActionCustomPermission } from '../permissionStructure'
import { HIRING_TEAM_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/hiring_team'

interface HiringTeamTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof HIRING_TEAM_ACTIONS> {}

export default HiringTeamTemplatePermission
