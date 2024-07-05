import { Team } from 'features/teams/domain/interfaces'

export type Hiring = {
  id: string
  name: string
  work_email: string
  team: Team
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  entity_permissions: EntityPermission[]
}

export type EntityPermission = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission: Permission
}

export type NewEntityPermissionInput = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission_id: string
}

export type Permission = {
  id: string
  title: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  operation_name: string
}

export type HiringInput = {
  name: string
  work_email: string
  note: string
  status: string
  team_id:string
  entity_permissions: NewEntityPermissionInput[]
}

export type ChangeStatusUser = {
  note: string
  status: 'active' | 'inactive'
}


export type EntityPermissions = {
  [key: string]: RoleTemplateEntityPermission
}

type RoleTemplateEntityPermission = {
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
  permissionId: string
  id: string
  permissionGroupId: string
}