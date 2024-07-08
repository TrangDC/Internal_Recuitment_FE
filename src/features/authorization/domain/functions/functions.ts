import _ from 'lodash'
import { ICheckPermissions, ICheckPermissionsWithNModule } from '../interfaces'
import PermissionStructureImpl from '../interfaces/permission-refactor'
export function checkPermissions<M extends keyof PermissionStructureImpl>(
  props: ICheckPermissions<M>
): boolean {
  const { role, checkBy, module } = props
  const { permissions = [], compare } = checkBy
  if (!role) return false
  const isAccepted = permissions.reduce((acc, action) => {
    const hasPermission = _.get(role, `${module}.${action}`, false)
    if (compare === 'hasAll') return acc && hasPermission
    return acc || hasPermission
  }, false)
  return isAccepted
}

export function checkPermissionsWithNModule<M extends keyof PermissionStructureImpl>(
  props: ICheckPermissionsWithNModule<M>
): boolean {
  const { role, modules ,compare} = props
  if (!role) return false
  const hasPermission =  modules.reduce((acc, module) => {
     const isAccepted = module.permission.reduce((acc2, action) => {
      const has = _.get(role, `${module}.${action}`, false)
      return acc2 || has
     }, false)
     if (compare === 'hasAll') return acc && isAccepted
     return acc || isAccepted
  }, false)
  return hasPermission
}

export const isTeamOnly = (userTeamId: string, teamId: string) => {
  return userTeamId === teamId
}
