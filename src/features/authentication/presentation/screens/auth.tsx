import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Token from 'shared/class/token'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import TalenaApiService from 'services/talena-api-services'
import handleTalenaLocalStorage from 'services/talena-local-storage-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const AuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { saveToken } = handleAuthLocalStorage()
  const { saveToken: saveTalenaToken } = handleTalenaLocalStorage()
  useEffect(() => {
    async function main() {
      const azureToken = loginAzure()
      if (azureToken) {
        const talenaToken = await signToTalena()
        if (talenaToken) {
          saveToken(azureToken)
          saveTalenaToken(talenaToken)
        }
      }
      navigate('/auth/login')
    }
    main()
  }, [])

  function loginAzure() {
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
      return token
    }

    return null
  }

  async function signToTalena() {
    const token = await TalenaApiService.getToken()
    if (isRight(token)) return unwrapEither(token)
    return null
  }
  return null
}

export default AuthCallback
