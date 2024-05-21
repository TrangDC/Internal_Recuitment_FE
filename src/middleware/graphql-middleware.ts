import { RequestMiddleware, ResponseMiddleware } from 'graphql-request'
import { toastErrorApi } from 'shared/components/toast/toastError'
import { callRefreshToken, getAccessToken } from 'shared/utils/auth'

export const requestMiddleware: RequestMiddleware = async (request) => {
  const token = await getAccessToken()

  const headers = {
    Authorization: `Bearer ${token}`, // Set your token in the Authorization header
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

  switch(response?.status) {
    //handle case refreshToken
    case 401:
      callRefreshToken()
    break;
  }

  //handle common errors
  if (!(response instanceof Error) && response?.errors) {
    // toastErrorApi(response.errors)
  }
}
