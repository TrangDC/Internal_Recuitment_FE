export type NewEntityPermissionInput = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission_id: string
}

export type NewUserInput = {
  name: string
  work_email: string
  note: string
  status: string
  hiring_team_id: string
  entity_permissions: NewEntityPermissionInput[]
  role_id: string[]
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
