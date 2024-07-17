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

  return { getToken, saveToken, isToken, removeToken }
}

export default handleAuthLocalStorage
