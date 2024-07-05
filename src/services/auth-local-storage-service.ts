import { AuthUser } from 'contexts/JWTAuth'
import { jwtDecode } from 'jwt-decode'
import Token from 'shared/class/token'

function handleAuthLocalStorage() {
  const KEY = 'trec-token'
  function getToken(): Token | undefined {
    const token = localStorage.getItem(KEY)
    if (token) return Token.fromJson(JSON.parse(token))
  }

  function saveToken(token: Token) {
    localStorage.setItem(KEY, JSON.stringify(token))
  }

  function isToken(): boolean {
    const token = localStorage.getItem(KEY)
    return !token
  }

  function removeToken() {
    localStorage.removeItem(KEY)
  }

  function getMe(): AuthUser {
    const token = getToken()
    const userName = token
      ? jwtDecode<{ name: string }>(token?.accessToken)?.name
      : ''
    const email = token
      ? jwtDecode<{ preferred_username: string }>(token?.accessToken)
          ?.preferred_username
      : ''
    const oid = token ? jwtDecode<{ oid: string }>(token?.accessToken)?.oid : ''
    return {
      name: userName,
      email: email,
      oid: oid,
    }
  }
  return { getToken, saveToken, isToken, removeToken, getMe }
}

export default handleAuthLocalStorage
