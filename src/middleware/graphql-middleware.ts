import { RequestMiddleware, ResponseMiddleware } from 'graphql-request'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import { callRefreshToken } from 'shared/utils/auth'

const { getToken } = handleAuthLocalStorage()

export const requestMiddleware: RequestMiddleware = async (request) => {
  const token = await getToken()

  const headers = {
    Authorization: `Bearer ${token?.accessToken}`, // Set your token in the Authorization header
  }

  return {
    ...request,
    headers: { ...request.headers, ...headers },
  }
}

export const responseMiddleware: ResponseMiddleware = async (
  responseMiddle
) => {
  /**
   * @response typeof ResponseMiddleware
   */
  //@ts-ignore
  const { response } = responseMiddle

  switch (response?.status) {
    //handle case refreshToken
    case 401:
      callRefreshToken()
      break
  }

  //handle common errors
  if (!(response instanceof Error) && response?.errors) {
    // toastErrorApi(response.errors)
  }
}
