import { createContext, ReactNode, useEffect, useReducer } from 'react'
import LoadingScreen from 'shared/components/LoadingScreen'
import Token from 'shared/class/token'
import { redirect } from 'react-router-dom'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import restApi from 'configs/api/restApi'
// --------------------------------------------------------

type InitialAuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
}

// props type
type AuthProviderProps = { children: ReactNode }
// --------------------------------------------------------

const initialState: InitialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
}

const reducer = (state: InitialAuthState, action: any) => {
  switch (action.type) {
    case 'INIT': {
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
      }
    }
    case 'LOGIN': {
      return { ...state, isAuthenticated: true }
    }
    case 'LOGOUT': {
      return { ...state, isAuthenticated: false }
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
  const { removeToken, getToken, saveToken } = handleAuthLocalStorage()
  const [state, dispatch] = useReducer(reducer, initialState)
  const login = () => {
    window.location.href = restApi.login
    dispatch({ type: 'LOGIN', token: null })
  }

  const logout = () => {
    removeToken()
    dispatch({
      type: 'LOGOUT',
      token: null,
    })
    redirect('/dashboard')
  }

  const setSession = async (token: Token) => {
    saveToken(token)
    dispatch({
      type: 'INIT',
      payload: { isAuthenticated: true },
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
            payload: { isAuthenticated: true },
          })
        } else {
          dispatch({
            type: 'INIT',
            payload: { isAuthenticated: false },
          })
        }
      } catch (err) {
        dispatch({
          type: 'INIT',
          payload: { isAuthenticated: false },
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('Auth')
  // show loading until not initialized
  if (!state.isInitialized) <LoadingScreen />

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
