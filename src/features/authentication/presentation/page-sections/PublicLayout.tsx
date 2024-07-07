import React, { Fragment, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// component props interface
interface PublicLayoutProps {
  children: ReactNode
}
const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { authState } = useAuth()
  let location = useLocation()
  if (authState === 'IS_AUTHENTICATED') {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return <Fragment>{children}</Fragment>
}

export default PublicLayout
