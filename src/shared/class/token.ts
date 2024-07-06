import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
class Token {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  constructor({ accessToken, refreshToken, expiresAt }: Token) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresAt = expiresAt
  }

  static fromJson(data: Record<string, any>): Token {
    return new Token({
      accessToken: (data.accessToken as string) ?? '',
      refreshToken: (data.refreshToken as string) ?? '',
      expiresAt: (data.expiresAt as Date) ?? null,
    })
  }
  private static subtract30Minutes() {
    return dayjs().subtract(30, 'minute').toDate()
  }

  static isTokenExpired(expiresAt: Date) {
    if (expiresAt) {
      return dayjs().isAfter(dayjs(expiresAt))
    }
    return true
  }

  static isValidToken = (accessToken: string): boolean => {
    try {
      if (!accessToken) return false
      jwtDecode(accessToken)
      return true
    } catch (error) {
      return false
    }
  }
}

export default Token
