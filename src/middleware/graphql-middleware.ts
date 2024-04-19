import { RequestMiddleware, ResponseMiddleware } from 'graphql-request'

function getAccessToken() {
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiI0NWI0NzBjMi01ZjI3LTRlN2MtYWUzNi0wMzlhODhmMjJhNWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNDIzM2I2NWYtNDA0ZC00ZWRjLWJhNDYtMDI2NWI2NWVlNWQ5L3YyLjAiLCJpYXQiOjE3MTMzMjQwMjUsIm5iZiI6MTcxMzMyNDAyNSwiZXhwIjoxNzEzMzI4Njk0LCJhaW8iOiJBVVFBdS84V0FBQUFaL3ZLZ0lmOEEraXZyY0x5STZVVG0wM2cvMmVVTzBJdWRyNytha2NNcm1zbnJCRHlkYVJ4WmJXRFhVRVhmWXRES1NlaC8wbU1CRWVKaVhBamFyc3JLZz09IiwiYXpwIjoiNDViNDcwYzItNWYyNy00ZTdjLWFlMzYtMDM5YTg4ZjIyYTVkIiwiYXpwYWNyIjoiMSIsIm5hbWUiOiJEYXZpZCBQaGFtIChURUNIVklGWS5JVFMpIiwib2lkIjoiMGVlZjIyNDgtN2ZmZC00MjMzLTkwMWEtMTVkNTEyODJhMjExIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGF2aWQucGhhbUB0ZWNodmlmeS5jb20udm4iLCJyaCI6IjAuQVZNQVg3WXpRazFBM0U2NlJnSmx0bDdsMmNKd3RFVW5YM3hPcmpZRG1vanlLbDNGQUhNLiIsInNjcCI6IkhSTS5SZWFkIiwic3ViIjoic0p0VEhfeVpxQTRRWlVoRnRGb2hqbkh1ZFotNFFDUHltV0FZQUVvdkFRVSIsInRpZCI6IjQyMzNiNjVmLTQwNGQtNGVkYy1iYTQ2LTAyNjViNjVlZTVkOSIsInV0aSI6Ikt0T3FzZEE5dFVlTXF1YXRaUlpaQUEiLCJ2ZXIiOiIyLjAifQ.XNuRI5oH3StzaHPC3e0-XX_wRF75BHS6HohD-AEuxUkmb9VD79VVdaczwEI-zTDalBEneryLx54Gxm1FArFenizPVzVDq5F_M8zXFatVqyK6cMeROYs7oPNijl6XNvoREPsYMxIxIshnudFnppqOkTeKpWPUAgwGZVtWNX0Ds2tmhXG2VYQWCPrwO0y-qnVDWrJCr1r32C3nZr2WDJQz1dSsJPaP5mBlwY--raqEXYOoaJFUHZOPC1k0HzRihC6uSVxariIxcIW2Vx4RfsQHp4Dpf1KFpfwOkyxgwuReBJAN5s4Snpd4rX7UIhiivIwKSNtcha40SLgZNW-Lm_JQ6Q'
}

export const requestMiddleware: RequestMiddleware = async (request) => {
  const token = await getAccessToken()
  const headers = {
    Authorization: `Bearer ${token}`, // Set your token in the Authorization header
  }
  return {
    ...request,
    headers: { ...request.headers, ...headers },
  }
}

export const responseMiddleware: ResponseMiddleware = (response) => {
  if (!(response instanceof Error) && response.errors) {
    console.error(
      `Request error:
        status ${String(response.status)}
        details: ${response.errors.map((_) => _.message).join(`, `)}`
    )
  }
}
