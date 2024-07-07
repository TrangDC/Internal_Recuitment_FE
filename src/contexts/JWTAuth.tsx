import { createContext, ReactNode, useEffect, useState } from 'react'
import LoadingScreen from 'shared/components/LoadingScreen'
import Token from 'shared/class/token'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import restApi from 'configs/api/restApi'
// --------------------------------------------------------

// props type
type AuthProviderProps = { children: ReactNode }
// --------------------------------------------------------

interface IAuthContext {
  authState: AuthState
  login: () => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({
  authState: 'INIT',
  logout: () => {},
  login: () => {},
})

type AuthState = 'INIT' | 'IS_AUTHENTICATED' | 'IS_NOT_AUTHENTICATED'

export const JWTAuthProvider = ({ children }: AuthProviderProps) => {
  const { removeToken, getToken } = handleAuthLocalStorage()
  const [authState, setAuthState] = useState<AuthState>('INIT')
  const login = () => {
    window.location.href = restApi.login
  }

  const logout = () => {
    removeToken()
    window.location.href = '/auth/login'
  }

  useEffect(() => {
    ;(async () => {
      try {
        const token = getToken()
        if (
          token &&
          token?.accessToken &&
          Token.isValidToken(token.accessToken)
        ) {
          setAuthState('IS_AUTHENTICATED')
        } else {
          setAuthState('IS_NOT_AUTHENTICATED')
        }
      } catch (err) {
        setAuthState('IS_NOT_AUTHENTICATED')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (authState === 'INIT') return <LoadingScreen />
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
