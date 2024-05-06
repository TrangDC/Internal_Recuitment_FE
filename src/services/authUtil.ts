import { ResponRefreshToken } from 'shared/interfaces'
import axiosInstance from 'shared/utils/axios'

export const handleSignIn = () => {
  window.location.href = `${process.env.REACT_APP_ENDPOINT_BE}/auth/login`
}

export const handleRefreshToken = async (
  refreshToken: string
): Promise<ResponRefreshToken> => {
  try {
    return await axiosInstance.post('/auth/refresh', { refreshToken })
  } catch (error) {
    throw error
  }
}
