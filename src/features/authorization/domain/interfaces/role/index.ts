export type UserResponse = {
  data: User
}

export type User = {
  id: string
  name: string
  work_email: string
  status: string
  team: Team
  entity_permissions: EntityPermission[]
}

type Team = {
  id: string
  name: string
}

export type EntityPermission = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission: Permission
}

type Permission = {
  id: string
  title: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  operation_name: string
}
