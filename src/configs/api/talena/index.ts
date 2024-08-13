import envConfig from 'configs/env/envConfig'
const baseurl = envConfig.endpoint_auth
const endpoint_talena = envConfig.endpoint_talena

const talenaApi = {
  token: `${baseurl}/talena/login`,
  extractCV: `${endpoint_talena}/cv_pool/upload_and_extract`,
  generateJD: `${endpoint_talena}/job_description/generate`,
  reWriteJD: `${endpoint_talena}/job_description/rewrite`,
  insightJD: `${endpoint_talena}/job_description/insight`,
}

export default talenaApi
