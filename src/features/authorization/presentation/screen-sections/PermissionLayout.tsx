import { ReactNode } from 'react'
import DashboardLayout from 'layouts/layout/DashboardLayout'
import Cant from '../components/Cant'
import DoNotAllowPage from 'pages/403'
import {
  CheckActions,
  ModuleName,
} from 'features/authorization/domain/interfaces/permission-refactor'

interface IPermissionLayout<M extends ModuleName> {
  children: ReactNode
  module: M
  checkBy: CheckActions<M>
}

export const PermissionLayout = <M extends ModuleName>({
  children,
  module,
  checkBy,
}: IPermissionLayout<M>) => {
  return (
    <Cant checkBy={checkBy} module={module} noPermissions={<DoNotAllowPage />}>
      <DashboardLayout>{children}</DashboardLayout>
    </Cant>
  )
}
