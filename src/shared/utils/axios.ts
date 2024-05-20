import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import toastError from 'shared/components/toast/toastError'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT_BE,
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  async (error: AxiosError) => {
    const errorData: unknown = error?.['response']?.['data']
    //@ts-ignore
    toastError(errorData?.['message'] as string)

    switch (error?.['response']?.['status']) {
      case 401:
        return errorData
      case 404:
        return errorData
      case 500: {
        return errorData
      }

      default:
        return Promise.reject(error)
    }
  }
)

export default axiosInstance
