import _ from 'lodash'
import { ICheckPermissions } from '../interfaces'
import PermissionStructureImpl from '../interfaces/permission-refactor'
export function checkPermissions<M extends keyof PermissionStructureImpl>(
  props: ICheckPermissions<M>
): boolean {
  const { role, checkBy, module } = props
  const { permissions = [] , compare} = checkBy
  if (!role) return false
  const isAccepted = permissions.reduce((acc, action) => {
    const hasPermission = _.get(role, `${module}.${action}`, false)
    if(compare == 'hasAll') return acc && hasPermission
    return acc || hasPermission
  }, false)
  return isAccepted
}
