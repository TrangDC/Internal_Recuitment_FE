import AuthContext from 'features/authentication/shared/contexts/Authentication'
import { useContext } from 'react'

const useAuth = () => useContext(AuthContext)

export default useAuth
