import { createContext, ReactNode, useReducer } from 'react'
import LoadingScreen from 'shared/components/LoadingScreen'
import axios from '../shared/utils/axios'

// --------------------------------------------------------
type AuthUser = null | Record<string, any>

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
    case 'REGISTER': {
      return { ...state, isAuthenticated: true, user: action.payload.user }
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
  login: (email: string, password: string) => Promise.resolve(),
  register: (email: string, password: string, username: string) =>
    Promise.resolve(),
})

export const JWTAuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email: string, password: string) => {
    const { data } = await axios.post('/api/auth/login', { email, password })
    // setSession(data.accessToken);
    dispatch({ type: 'LOGIN', payload: { user: data.user } })
  }

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    const { data } = await axios.post('/api/auth/register', {
      email,
      username,
      password,
    })
    // setSession(data.accessToken);
    dispatch({ type: 'REGISTER', payload: { user: data.user } })
  }

  const logout = () => {
    // setSession(null);
    dispatch({ type: 'LOGOUT' })
  }

  if (!state.isInitialized) <LoadingScreen />

  return (
    <AuthContext.Provider
      value={{ ...state, method: 'JWT', login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
