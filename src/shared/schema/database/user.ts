import EntityPermission from './entity_permission'
import HiringTeam from './hiring_team'
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
}

export default User
