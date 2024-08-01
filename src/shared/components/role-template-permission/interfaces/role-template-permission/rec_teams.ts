import { GenerateActionCustomPermission } from '../permissionStructure'
import { REC_TEAM_ACTIONS } from 'features/authorization/domain/interfaces/permission-refactor/rec_team'

interface RecTeamTemplatePermission
  extends GenerateActionCustomPermission<keyof typeof REC_TEAM_ACTIONS> {}

export default RecTeamTemplatePermission
