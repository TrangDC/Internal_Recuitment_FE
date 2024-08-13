const envConfig = {
  endpoint_api: process.env.REACT_APP_ENDPOINT_API ?? '',
  endpoint_auth: process.env.REACT_APP_ENDPOINT_BE ?? '',
  tiny_key: process.env.TINY_API_KEY ?? '',
  endpoint_talena: process.env.REACT_APP_ENDPOINT_TALENA ?? '',
}

export default envConfig
