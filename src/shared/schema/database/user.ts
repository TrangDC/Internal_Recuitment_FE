import EntityPermission from './entity_permission'
import HiringTeam from './hiring_team'
import RecTeam from './rec_team'
import Role from './role'

type UserStatus = 'active' | 'inactive'

interface User {
  id: string
  name: string
  work_email: string
  status: UserStatus
  hiring_team: HiringTeam
  entity_permissions: EntityPermission[]
  member_of_hiring_team: HiringTeam
  roles: Role[]
  member_of_rec_team: RecTeam
  is_leader_of_rec_team: boolean
  is_manager_of_hiring_team: boolean
}

export type UpdateUserArguments = {
  id: string
  input: UpdateUserInput
  note: string
}

export type UpdateUserInput = {
  name: string
  work_email: string
  status: string
  hiring_team_id: string
  role_id: string[]
  rec_team_id: string
}

export type NewEntityPermissionInput = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission_id: string
}

export default User
