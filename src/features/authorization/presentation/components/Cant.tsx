import { ReactNode } from 'react'
import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import PermissionStructureImpl, {
  CheckActions,
} from 'features/authorization/domain/interfaces/permission-refactor'

interface ICant<M extends keyof PermissionStructureImpl> {
  checkBy: CheckActions<M>
  children: ReactNode
  module: M
  noPermissions?: ReactNode
}

function Cant<M extends keyof PermissionStructureImpl>({
  children,
  checkBy,
  module,
  noPermissions,
}: ICant<M>) {
  const { role } = useAuthorization()
  const isPermission = checkPermissions<M>({
    checkBy: checkBy,
    module: module,
    role: role,
  })
  return <>{isPermission ? children : noPermissions}</>
}

export default Cant
