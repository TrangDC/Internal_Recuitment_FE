import { MyBasicInformation } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import useGetMe from 'features/authorization/hooks/useGetMe'
import { ReactNode, createContext } from 'react'
import LoadingScreen from 'shared/components/LoadingScreen'
import { isLeft } from 'shared/utils/handleEither'

interface IAuthorizationContext {
  role: PermissionStructureImpl | null
  user: MyBasicInformation | null
}

interface IAuthorization {
  children: ReactNode
}

export const AuthorizationContext = createContext<IAuthorizationContext>({
  role: null,
  user: null,
})

function AuthorizationProvider({ children }: IAuthorization) {
  const { myPermission, me, isFetching, data } = useGetMe()
  if (isFetching || (data && isLeft(data))) return <LoadingScreen />
  return (
    <AuthorizationContext.Provider value={{ role: myPermission, user: me }}>
      {children}
    </AuthorizationContext.Provider>
  )
}

export default AuthorizationProvider
