import { createContext, ReactNode, useEffect, useReducer } from 'react'
import LoadingScreen from 'shared/components/LoadingScreen'
import Token from 'shared/class/token'
import { redirect } from 'react-router-dom'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import restApi from 'configs/api/restApi'
// --------------------------------------------------------
export type AuthUser = {
  name: string
  email: string
  oid: string
} | null

type InitialAuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
}

// props type
type AuthProviderProps = { children: ReactNode }
// --------------------------------------------------------

const initialState: InitialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const reducer = (state: InitialAuthState, action: any) => {
  switch (action.type) {
    case 'INIT': {
      return {
        isInitialized: true,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      }
    }
    case 'LOGIN': {
      return { ...state, isAuthenticated: true, user: action.payload.user }
    }
    case 'LOGOUT': {
      return { ...state, user: null, isAuthenticated: false }
    }
    default: {
      return state
    }
  }
}

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  logout: () => {},
  login: () => {},
  setSession: (token: Token) => {},
})

export const JWTAuthProvider = ({ children }: AuthProviderProps) => {
  const { removeToken, getToken, getMe, saveToken } = handleAuthLocalStorage()
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = () => {
    window.location.href = restApi.login
    dispatch({ type: 'LOGIN' })
  }

  const logout = () => {
    removeToken()
    dispatch({ type: 'LOGOUT' })
    redirect('/dashboard')
  }

  const setSession = (token: Token) => {
    saveToken(token)
    dispatch({
      type: 'INIT',
      payload: { user: getMe(), isAuthenticated: true },
    })
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
          dispatch({
            type: 'INIT',
            payload: { user: getMe(), isAuthenticated: true },
          })
        } else {
          dispatch({
            type: 'INIT',
            payload: { user: null, isAuthenticated: false },
          })
        }
      } catch (err) {
        dispatch({
          type: 'INIT',
          payload: { user: null, isAuthenticated: false },
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // show loading until not initialized
  if (!state.isInitialized) <LoadingScreen />

  return (
    <AuthContext.Provider
      value={{ ...state, method: 'JWT', login, logout, setSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
