import axios from 'axios'
import graphqlUrl from 'configs/api/graphql'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import { handleRefreshToken } from 'services/authUtil'
import Token from 'shared/class/token'
import { ResponseRefreshToken } from 'shared/interfaces'

const { getToken, saveToken } = handleAuthLocalStorage()

let refreshTokenRequest: Promise<ResponseRefreshToken> | null = null

export const graphqlClient = axios.create({
  baseURL: graphqlUrl,
})

graphqlClient.interceptors.request.use(
  async function (config) {
    const token = await getToken()
    config.headers.Authorization = `Bearer ${token?.accessToken}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

graphqlClient.interceptors.response.use(
  async function (response) {
    if (response.status === 215) {
      const newToken = await getRefreshToken()
      response.headers.Authorization = `Bearer ${newToken?.accessToken}`
    }
    return {
      ...response,
      data: response.data,
    }
  },
  async function (error) {
    const status = error?.response?.status
    const config = error.config
    if (status === 401) {
      const newToken = await getRefreshToken()
      config.headers.Authorization = `Bearer ${newToken?.accessToken}`
      refreshTokenRequest = null
      return graphqlClient(config)
    }
    return Promise.reject(error)
  }
)

async function getRefreshToken() {
  const refreshToken = getToken()?.refreshToken
  if (refreshToken) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : handleRefreshToken(refreshToken)
    const response = await refreshTokenRequest
    if (response) {
      const token = new Token({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: new Date(response.expiresAt),
      })
      saveToken(token)
      return token
    }
    window.location.href = '/auth/login'
  }
  window.location.href = '/auth/login'
}
