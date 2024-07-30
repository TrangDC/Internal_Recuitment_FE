import { GenerateAction } from '.'

export const USER_ACTIONS = {
  VIEW: 'GetUser,GetAllUsers',
  EDIT: 'UpdateUser,UpdateUserStatus',
}
export interface UserPermissions
  extends GenerateAction<keyof typeof USER_ACTIONS> {}
