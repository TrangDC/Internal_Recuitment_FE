import envConfig from 'configs/env/envConfig'
const baseurl = envConfig.endpoint_auth
const restApi = {
  login: `${baseurl}/auth/login`,
  refresh: `${baseurl}/auth/refresh`,
}

export default restApi
