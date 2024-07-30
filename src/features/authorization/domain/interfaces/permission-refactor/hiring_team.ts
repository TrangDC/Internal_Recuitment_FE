import { GenerateAction } from '.'

export const HIRING_TEAM_ACTIONS = {
  VIEW: 'GetHiringTeam,GetAllHiringTeams',
  CREATE: 'CreateHiringTeam',
  EDIT: 'UpdateHiringTeam',
  DELETE: 'DeleteHiringTeam',
}
export interface HiringTeamPermissions
  extends GenerateAction<keyof typeof HIRING_TEAM_ACTIONS> {}
