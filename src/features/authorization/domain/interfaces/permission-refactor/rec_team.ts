import { GenerateAction } from '.'

export const REC_TEAM_ACTIONS = {
  VIEW: 'GetRecTeam,GetAllRecTeams',
  CREATE: 'CreateRecTeam',
  EDIT: 'UpdateRecTeam',
  DELETE: 'DeleteRecTeam',
}
export interface RecTeamPermissions
  extends GenerateAction<keyof typeof REC_TEAM_ACTIONS> {}
