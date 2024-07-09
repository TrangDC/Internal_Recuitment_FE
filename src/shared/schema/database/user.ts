import EntityPermission from './entityPermission'
import Role from './role'
import Team from './team'

type UserStatus = 'active' | 'inactive'

interface User {
  id: string
  name: string
  work_email: string
  status: UserStatus
  team: Team
  entity_permissions: EntityPermission[]
  member_of_teams: Team
  roles: Role[]
}

export default User
