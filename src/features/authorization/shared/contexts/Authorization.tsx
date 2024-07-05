import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import useGetCurrentRole from 'features/authorization/hooks/useGetCurrentRole'
import LoadingSpinner from 'pages/LoadingSpiner'
import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'

interface IAuthorizationContext {
  role: PermissionStructureImpl | null
}

interface IAuthorization {
  children: ReactNode
}

export const AuthorizationContext = createContext<IAuthorizationContext>({
  role: null,
})

function AuthorizationProvider({ children }: IAuthorization) {
  const { myPermission, isFetching } = useGetCurrentRole()
  const data = useMemo(() => {
    const entity_permissions = myPermission?.entity_permissions ?? []
    const dataPermission = PermissionStructureImpl.fromJson(entity_permissions)
    return dataPermission
  }, [myPermission])

  if (isFetching) {
    return <LoadingSpinner />
  }
  return (
    <AuthorizationContext.Provider value={{ role: data }}>
      {children}
    </AuthorizationContext.Provider>
  )
}

export default AuthorizationProvider
