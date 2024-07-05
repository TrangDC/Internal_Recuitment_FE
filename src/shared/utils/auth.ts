import { handleRefreshToken } from 'services/authUtil'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import Token from 'shared/class/token'

const { getToken, removeToken, saveToken } = handleAuthLocalStorage()

function handleRemoveToken() {
  removeToken()
  window.location.href = '/auth/login'
}

function handleRefreshTokenMiddleWare() {
  let refreshTokenCalled = false

  async function updateTokenByRefreshToken() {
    if (!refreshTokenCalled) {
      refreshTokenCalled = true

      try {
        const refreshToken = getToken()?.refreshToken
        if (refreshToken) {
          const response = await handleRefreshToken(refreshToken)
          const token = new Token({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresAt: new Date(response.expiresAt),
          })
          saveToken(token)
        }
      } catch (error) {
        handleRemoveToken()
      }

      refreshTokenCalled = false
    }
  }

  return updateTokenByRefreshToken
}

export const callRefreshToken = handleRefreshTokenMiddleWare()
