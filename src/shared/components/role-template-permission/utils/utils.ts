import { PermissionData } from 'features/role-template/domain/interfaces'
import { Role } from '../interfaces'
import { BaseRecord } from 'shared/interfaces'
import {
  ActionPermission,
  MergePermissionValue,
} from '../interfaces/permissionStructure'

export function getCheck(
  key: 'for_all' | 'for_team' | 'for_owner',
  value: ActionPermission,
  actionsPermission: ActionPermission
) {
  const { for_owner = false, for_team = false } = actionsPermission
  const defaults = {
    for_all: false,
    for_owner: false,
    for_team: false,
  }
  switch (key) {
    case 'for_all':
      return handleForAll(value, for_owner, for_team, defaults)
    case 'for_team':
      return handleForTeam(value, for_owner, for_team, defaults)
    case 'for_owner':
      return handleForOwner(value, defaults)
    default:
      return defaults
  }
}

function handleForAll(
  value: ActionPermission,
  for_owner: boolean,
  for_team: boolean,
  defaults: any
) {
  const isCheck = value?.for_all
  if (isCheck) {
    if ((for_owner && for_team) || (!for_owner && for_team)) {
      return { ...defaults, for_owner: false, for_team: true }
    }
    if (!for_owner && !for_team) {
      return defaults
    }
  }
  return { ...defaults, for_all: true }
}

function handleForTeam(
  value: ActionPermission,
  for_owner: boolean,
  for_team: boolean,
  defaults: any
) {
  const isCheck = value?.for_team
  if (isCheck) {
    if (for_owner) {
      return { ...defaults, for_owner: true }
    }
    if (!for_owner) {
      return { ...defaults, for_owner: false }
    }
  }
  if (value?.for_all) {
    if (for_owner) {
      return { ...defaults, for_owner: true, for_team: false }
    }
    return defaults
  }
  return { ...defaults, for_team: true }
}

function handleForOwner(value: ActionPermission, defaults: any) {
  if (value?.for_owner || value?.for_team || value?.for_all) {
    return defaults
  }
  return { ...defaults, for_owner: true }
}

export function getKeyName(id: string) {
  return `entity_permissions.${id}.value`
}

export function mergePermissions(
  permissionGroups: Role[]
): MergePermissionValue {
  const permissions: MergePermissionValue = {}
  permissionGroups.forEach((role) => {
    role.entity_permissions.forEach((entity) => {
      const permissionId = entity.permission.id
      if (!permissions[permissionId]) {
        permissions[permissionId] = {
          for_all: entity.for_all,
          for_owner: entity.for_owner,
          for_team: entity.for_team,
        }
      } else {
        if (entity.for_all) {
          permissions[permissionId].for_all = true
          permissions[permissionId].for_team = false
          permissions[permissionId].for_owner = false
        } else if (entity.for_team) {
          permissions[permissionId].for_team = true
          permissions[permissionId].for_owner = false
          permissions[permissionId].for_all = false
        } else if (entity.for_team) {
          permissions[permissionId].for_team = false
          permissions[permissionId].for_owner = true
          permissions[permissionId].for_all = false
        } else {
          permissions[permissionId].for_team = false
          permissions[permissionId].for_owner = false
          permissions[permissionId].for_all = false
        }
      }
    })
  })
  return permissions
}
