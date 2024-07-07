import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Token from 'shared/class/token'
import handleAuthLocalStorage from 'services/auth-local-storage-service'

const AuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { saveToken } = handleAuthLocalStorage()
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
      saveToken(token)
      window.location.href = '/'
    } else {
      navigate('/auth/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default AuthCallback
