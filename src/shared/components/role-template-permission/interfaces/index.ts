import { RoleTemplate } from './permissionStructure'

export interface PermissionGroup {
  id: string
  title: string
  group_type: string
  permissions: Permission[]
}

interface Permission {
  id: string
  title: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  operation_name: string
}

export interface PermissionGroupProps {
  roleTemplate: RoleTemplate
}

export interface Role {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

export interface EntityPermission {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission: Permission
}
