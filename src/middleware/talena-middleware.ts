import axios from 'axios'
import graphqlUrl from 'configs/api/graphql'
import TalenaApiService from 'services/talena-api-services'
import handleTalenaLocalStorage from 'services/talena-local-storage-service'
import { Either } from 'shared/interfaces/common'
import TalenaToken from 'shared/schema/talenaToken'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const { getToken, saveToken } = handleTalenaLocalStorage()

let reGetToken: Promise<Either<null, TalenaToken>> | null = null

export const talenaClient = axios.create({
  baseURL: graphqlUrl,
})

talenaClient.interceptors.request.use(
  async function (config) {
    const token = await getToken()
    config.headers.Authorization = `Bearer ${token?.accessToken}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

talenaClient.interceptors.response.use(
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
      reGetToken = null
      return talenaClient(config)
    }
    return Promise.reject(error)
  }
)

async function getRefreshToken() {
  reGetToken = reGetToken ? reGetToken : TalenaApiService.getToken()
  const response = await reGetToken
  if (isRight(response)) {
    const token = unwrapEither(response)
    saveToken(unwrapEither(response))
    return token
  }
  window.location.href = '/auth/login'
  return null
}
