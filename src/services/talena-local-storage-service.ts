import Token from 'shared/class/token'
import TalenaToken from 'shared/schema/talenaToken'

function handleTalenaLocalStorage() {
  const KEY = 'talena-token'
  function getToken(): TalenaToken | undefined {
    const token = localStorage.getItem(KEY)
    if (token) return Token.fromJson(JSON.parse(token))
  }

  function saveToken(token: TalenaToken) {
    localStorage.setItem(KEY, JSON.stringify(token))
  }

  function isToken(): boolean {
    const token = localStorage.getItem(KEY)
    return !token
  }

  function removeToken() {
    localStorage.removeItem(KEY)
  }

  return { getToken, saveToken, isToken, removeToken }
}

export default handleTalenaLocalStorage
