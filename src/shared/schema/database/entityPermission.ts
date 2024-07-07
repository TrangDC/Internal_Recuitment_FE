import Permission from './permission'

interface EntityPermission {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission: Permission
}

export default EntityPermission
