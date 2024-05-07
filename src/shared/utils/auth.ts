import {
  TREC_ACCESS_TOKEN,
  TREC_REFRESH_TOKEN,
} from 'shared/constants/constants'
import { handleLocalStorage } from './utils'
import { handleRefreshToken } from 'services/authUtil'

export function getAccessToken() {
  const { getStatusByKey } = handleLocalStorage()
  return getStatusByKey(TREC_ACCESS_TOKEN)
}

export function getRefreshToken() {
  const { getStatusByKey } = handleLocalStorage()
  return getStatusByKey(TREC_REFRESH_TOKEN)
}

export function removeToken() {
  const { deleteLocalStorge } = handleLocalStorage()
  deleteLocalStorge(TREC_ACCESS_TOKEN);
  deleteLocalStorge(TREC_REFRESH_TOKEN);

  window.location.href = '/login'
}

export function updateToken(accessToken: string, refreshToken: string) {
  const { updateStorage } = handleLocalStorage()
  updateStorage(TREC_ACCESS_TOKEN, accessToken)
  updateStorage(TREC_REFRESH_TOKEN, refreshToken)
}

function handleRefreshTokenMiddleWare() {
  let refreshTokenCalled = false

  async function updateTokenByRefreshToken() {
    if (!refreshTokenCalled) {
      refreshTokenCalled = true

      try {
        const responseRefreshToken = await handleRefreshToken(getRefreshToken())
        updateToken(
          responseRefreshToken.accessToken,
          responseRefreshToken.refreshToken
        )
      } catch (error) {
        removeToken()
      }

      refreshTokenCalled = false
    }
  }

  return updateTokenByRefreshToken
}

export const callRefreshToken = handleRefreshTokenMiddleWare()
