type Permission = {
  id: string
  title: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  operation_name: string
}

export interface RoleTemplate {
  id: string
  name: string
  description: string
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

export type NewRoleTemplateInput = {
  name: string
  description: string
  entity_permissions: NewEntityPermissionInput[]
  note: string
}

export type UpdateRoleInput = {
  name: string
  description: string
  entity_permissions: NewEntityPermissionInput[]
  note: string
}

export type PermissionData = {
  [x: string]: PermissionValue
}

export type PermissionValue = {
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
}
