import { GenerateAction } from '.'

export const HIRING_TEAM_ACTIONS = {
  VIEW: 'GetUser,GetAllUsers',
  EDIT: 'UpdateUser,UpdateUserStatus',
}
export interface HiringTeamPermissions
  extends GenerateAction<keyof typeof HIRING_TEAM_ACTIONS> {}
