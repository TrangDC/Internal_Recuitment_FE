import { useContext } from 'react'
import { AuthorizationContext } from '../shared/contexts/Authorization'
export const useAuthorization = () => useContext(AuthorizationContext)
