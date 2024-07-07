// import Login from "features/authentication/presentation/pages/login";
import { Fragment, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../providers/hooks/useAuth'

// component props interface
interface ProtectedLayoutProps {
  children: ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { authState } = useAuth()
  let location = useLocation()
  if (authState === 'IS_NOT_AUTHENTICATED') {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }
  return <Fragment>{children}</Fragment>
}

export default ProtectedLayout
