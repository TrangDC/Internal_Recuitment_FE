import { RequestMiddleware, ResponseMiddleware } from 'graphql-request'
import { handleRefreshToken } from 'services/authUtil';
import { TREC_ACCESS_TOKEN, TREC_REFRESH_TOKEN } from 'shared/constants/constants';
import { handleLocalStorage } from 'shared/utils/utils';

function getAccessToken() {
  const { getStatusByKey } = handleLocalStorage();
  return getStatusByKey(TREC_ACCESS_TOKEN);
}

function getRefreshToken() {
  const { getStatusByKey } = handleLocalStorage();
  return getStatusByKey(TREC_REFRESH_TOKEN);
}

function updateToken(accessToken: string, refreshToken: string) {
  const { updateStorage } = handleLocalStorage(); 
  updateStorage(TREC_ACCESS_TOKEN, accessToken);
  updateStorage(TREC_REFRESH_TOKEN, refreshToken);
}

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

export const responseMiddleware: ResponseMiddleware = async (responseMiddle) => {
 //@ts-ignore
  const { response } = responseMiddle;
  // console.log("🚀 ~ response:", response)
  switch(response?.status) {
    case 401:
      const responseRefreshToken = await handleRefreshToken(getRefreshToken());
      updateToken(responseRefreshToken.accessToken, responseRefreshToken.refreshToken);
      
    break;
  }

  if (!(response instanceof Error) && response.errors) {
    console.error(
      `Request error:
        status ${String(response.status)}
        details: ${response.errors.map((_: any) => _.message).join(`, `)}`
    )
  }
}
