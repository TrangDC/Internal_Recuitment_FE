import { GenerateAction } from '.'

export const TEAM_ACTIONS = {
  VIEW: 'GetTeam,GetAllTeams',
  CREATE: 'CreateTeam',
  EDIT: 'UpdateTeam',
  DELETE: 'DeleteTeam',
}
export interface TeamPermissions
  extends GenerateAction<keyof typeof TEAM_ACTIONS> {}
