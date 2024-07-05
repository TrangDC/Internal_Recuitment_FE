import { checkPermissions } from '../domain/functions/functions'
import PermissionStructureImpl, {
  CheckActions,
} from '../domain/interfaces/permission-refactor'
import { useAuthorization } from './useAuthorization'

export interface IUsePermissions<M extends keyof PermissionStructureImpl> {
  module: M
  checkBy: CheckActions<M>
}
function usePermission<M extends keyof PermissionStructureImpl>({
  checkBy,
  module,
}: IUsePermissions<M>) {
  const { role } = useAuthorization()
  const hasPermission = checkPermissions({
    role: role,
    checkBy,
    module,
  })
  return hasPermission
}

export default usePermission
