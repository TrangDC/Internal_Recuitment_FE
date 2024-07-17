import { ResponRefreshToken } from 'shared/interfaces'
import axiosInstance from 'shared/utils/axios'

export const handleRefreshToken = async (
  refreshToken: string
): Promise<ResponRefreshToken> => {
  try {
    return await axiosInstance.post('/auth/refresh', { refreshToken })
  } catch (error) {
    throw error
  }
}
