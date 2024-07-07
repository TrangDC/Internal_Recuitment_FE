import _ from 'lodash'
import { BaseRecord } from 'shared/interfaces/common'
import {
  PermissionFormData,
  EntityPermissionsFormData,
  GroupPermissionByGroupType,
  PermissionData,
} from '../interface'
import { EntityPermission, PermissionGroup } from '../interface/response'
import { NewEntityPermissionInput } from 'features/role-template/domain/interfaces'
import Role from 'shared/schema/database/role'

export function formatDefaultFormDataPermission(
  data: PermissionGroup[]
): PermissionFormData {
  const permissions: PermissionFormData = {}
  data.forEach((permissionGroup) => {
    permissionGroup.permissions.forEach((permission) => {
      const permissionId = permission.id
      const permissionFormData: EntityPermissionsFormData = {
        id: '',
        ownedOnly: false,
        teamOnly: false,
        everything: false,
        permissionTemplate: {
          id: permission.id,
          hasEverything: permission.for_all,
          hasOwnerOnly: permission.for_owner,
          hasTeamOnly: permission.for_team,
        },
      }
      _.set(permissions, `${permissionId}`, permissionFormData)
    })
  })
  return permissions
}

export function formatChecksToBE(
  data: NewEntityPermissionInput[]
): NewEntityPermissionInput[] {
  return data.map((permission) => {
    const { for_all, for_team, for_owner } = permission
    return {
      ...permission,
      for_all: !!for_all,
      for_team: !for_all && !!for_team,
      for_owner: !for_all && !for_team && !!for_owner,
    }
  })
}

export function createNewEntityPermissionInput(
  data: PermissionFormData
): NewEntityPermissionInput[] {
  const convertToArray: NewEntityPermissionInput[] = []
  Object.keys(data).forEach((entityKey) => {
    const permission: EntityPermissionsFormData = _.get(data, entityKey)
    if (
      permission.permissionTemplate.hasEverything &&
      !permission.permissionTemplate.hasOwnerOnly &&
      !permission.permissionTemplate.hasTeamOnly
    ) {
      convertToArray.push({
        id: permission.id ?? '',
        for_owner: false,
        for_team: false,
        for_all: permission?.everything,
        permission_id: permission?.permissionTemplate.id,
      })
    }
    if (
      permission.permissionTemplate.hasTeamOnly &&
      permission.permissionTemplate.hasEverything &&
      !permission.permissionTemplate.hasOwnerOnly
    ) {
      convertToArray.push({
        id: permission.id ?? '',
        for_owner: false,
        for_team: permission?.teamOnly,
        for_all: permission?.everything,
        permission_id: permission?.permissionTemplate.id,
      })
    }

    if (
      permission.permissionTemplate.hasTeamOnly &&
      permission.permissionTemplate.hasEverything &&
      permission.permissionTemplate.hasOwnerOnly
    ) {
      convertToArray.push({
        id: permission.id ?? '',
        for_owner: permission?.ownedOnly,
        for_team: permission?.teamOnly,
        for_all: permission?.everything,
        permission_id: permission?.permissionTemplate.id,
      })
    }
  })
  return convertToArray
}

export function groupByPermissionsByGroupType(
  data: PermissionGroup[]
): GroupPermissionByGroupType {
  const permissions: GroupPermissionByGroupType = {}
  data.forEach((permissionGroup) => {
    if (!permissions[permissionGroup.group_type]) {
      permissions[permissionGroup.group_type] = [permissionGroup]
    } else {
      permissions[permissionGroup.group_type].push(permissionGroup)
    }
  })
  return permissions
}

export function mergeCurrentPermissionWithDefaultFormDataPermission(
  defaultPermissions: PermissionGroup[],
  currentPermissions: EntityPermission[]
): PermissionFormData {
  const transferData: PermissionFormData = {}
  defaultPermissions.forEach((defaultPermission) => {
    defaultPermission.permissions.forEach((permission) => {
      const entityPermission = currentPermissions.find(
        (currentPermissions) =>
          currentPermissions.permission.id === permission.id
      )
      let ownedOnly = false
      let teamOnly = false
      let everything = false

      switch (true) {
        case entityPermission?.for_all:
          ownedOnly = true
          teamOnly = true
          everything = true
          break
        case entityPermission?.for_team:
          ownedOnly = true
          teamOnly = true
          everything = false
          break
        case entityPermission?.for_owner:
          ownedOnly = true
          teamOnly = false
          everything = false
          break
        default:
          ownedOnly = false
          teamOnly = false
          everything = false
          break
      }
      const permissionData: EntityPermissionsFormData = {
        id: entityPermission?.id ?? '',
        everything,
        ownedOnly,
        teamOnly,
        permissionTemplate: {
          id: permission.id,
          hasEverything: permission.for_all,
          hasOwnerOnly: permission.for_owner,
          hasTeamOnly: permission.for_team,
        },
      }
      transferData[permission.id] = permissionData
    })
  })
  return transferData
}

export function mergePermissions(permissionGroups: Role[]): PermissionData {
  const permissions: { [key: string]: BaseRecord } = {}

  // Aggregate permissions
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
        permissions[permissionId].for_all =
          permissions[permissionId].for_all || entity.for_all
        permissions[permissionId].for_owner =
          permissions[permissionId].for_owner || entity.for_owner
        permissions[permissionId].for_team =
          permissions[permissionId].for_team || entity.for_team
      }
    })
  })

  // Transform the permissions into the required format
  const newPermissions: PermissionData = {}
  Object.keys(permissions).forEach((permissionId) => {
    const permission = permissions[permissionId]
    newPermissions[permissionId] = {
      ownedOnly:
        permission.for_all || permission.for_team || permission.for_owner,
      teamOnly: permission.for_all || permission.for_team,
      everything: permission.for_all,
    }
  })

  return newPermissions
}
