import { PermissionGroup } from './response'

export type PermissionFormData = {
  [key: string]: EntityPermissionsFormData
}

export interface EntityPermissionsFormData {
  id: string
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
  permissionTemplate: PermissionTemplate
}

interface PermissionTemplate {
  id: string
  hasOwnerOnly: boolean
  hasTeamOnly: boolean
  hasEverything: boolean
}

export type GroupPermissionByGroupType = {
  [x: string]: PermissionGroup[]
}


export type PermissionData = {
  [x: string]: PermissionValue
}

export type PermissionValue = {
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
}
