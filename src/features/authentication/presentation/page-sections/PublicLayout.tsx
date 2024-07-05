import React, { Fragment, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../providers/hooks/useAuth'

// component props interface
interface PublicLayoutProps {
  children: ReactNode
}
const PublicLayout = ({ children }: PublicLayoutProps) => {
  const auth = useAuth()
  let location = useLocation()
  if (auth.isAuthenticated && auth.isInitialized) {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return <Fragment>{children}</Fragment>
}

export default PublicLayout
