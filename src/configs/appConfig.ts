const appConfig = {
  endpoint_api: process.env.REACT_APP_ENDPOINT_API ?? '',
  endpoint_auth: process.env.REACT_APP_ENDPOINT_BE ?? '',
  tiny_key: process.env.TINY_API_KEY ?? '',
}

export default appConfig
