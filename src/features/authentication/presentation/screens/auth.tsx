import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../providers/hooks/useAuth'
import Token from 'shared/class/token'

const AuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setSession } = useAuth()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const expiresAt = searchParams.get('expiresAt')
    if (accessToken && refreshToken && expiresAt) {
      const token = new Token({
        accessToken,
        expiresAt: new Date(Number(expiresAt) * 1000),
        refreshToken,
      })
      setSession(token)
    } else {
      navigate('/auth/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return null
}

export default AuthCallback
