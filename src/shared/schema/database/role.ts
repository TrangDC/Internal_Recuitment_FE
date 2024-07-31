import EntityPermission from './entity_permission'
import { NewEntityPermissionInput } from './user'

interface Role {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

export type CreateRoleArguments = {
  input: NewRoleInput
  note: string
}

export type UpdateRoleArguments = {
  id: string
  input: UpdateRoleInput
  note: string
}

export type DeleteRoleArgument = {
  id: string
  note: string
}

export type NewRoleInput = {
  name: string
  description: string
  entity_permissions: NewEntityPermissionInput[]
}

export type UpdateRoleInput = {
  name: string
  description: string
  entity_permissions: NewEntityPermissionInput[]
}

export default Role
