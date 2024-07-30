import { HIRING_TEAM_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/hiring_team'
import { GenerateActionCustomPermission } from '../permissionStructure'

interface HiringTeamTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof HIRING_TEAM_ACTIONS> {}

export default HiringTeamTemplatePermission
