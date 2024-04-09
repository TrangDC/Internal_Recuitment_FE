import { ApolloLink, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql' })

const authMiddleware = new ApolloLink((request, forward) => {
  // add the authorization to the headers
  request.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiI0NWI0NzBjMi01ZjI3LTRlN2MtYWUzNi0wMzlhODhmMjJhNWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNDIzM2I2NWYtNDA0ZC00ZWRjLWJhNDYtMDI2NWI2NWVlNWQ5L3YyLjAiLCJpYXQiOjE3MTI1NzAxODIsIm5iZiI6MTcxMjU3MDE4MiwiZXhwIjoxNzEyNTc1MzU0LCJhaW8iOiJBV1FBbS84V0FBQUEveWNHT3ZsQjVBbW5VVVBzSGxoekgrU24xc2ZURUo4Y3JhakNEMUNGQURzOUlVY2QxaVlHK3FYZWZ0M0tBelFDQ295eDZqblBWM3UxRXkzbzZtamdiSnNpZVhMeTl3RURscE1MN0JHZGhpdnZiZUk1OFI0TUVwOTg0Z0ZkUGF6TCIsImF6cCI6IjQ1YjQ3MGMyLTVmMjctNGU3Yy1hZTM2LTAzOWE4OGYyMmE1ZCIsImF6cGFjciI6IjEiLCJuYW1lIjoiQW5kcmV3IFBoYW0gKFRFQ0hWSUZZLklUUykiLCJvaWQiOiI0YjViMGVjMS0yMjA3LTRlZWQtOTBjYy05NTJmNDk0ZWRjYjMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbmRyZXcucGhhbUB0ZWNodmlmeS5jb20udm4iLCJyaCI6IjAuQVZNQVg3WXpRazFBM0U2NlJnSmx0bDdsMmNKd3RFVW5YM3hPcmpZRG1vanlLbDNGQUdVLiIsInNjcCI6IkhSTS5SZWFkIiwic3ViIjoiUWFxaVc5NE00bHMyX2VLdEZuMDVzb0VmV3FNSFJUbGZEaHIxelNVRkRQVSIsInRpZCI6IjQyMzNiNjVmLTQwNGQtNGVkYy1iYTQ2LTAyNjViNjVlZTVkOSIsInV0aSI6ImNDb2o5RXFFSlVTd1Y0X2ZlVEtUQUEiLCJ2ZXIiOiIyLjAifQ.y9NmOy6abkLnYBinP5OiopcLj0YGEJlj6WkOsrrSnTWyaQJDNxVNvDhd5RBa_8bRCkkiEErmuvufrcww1JT8Q0hgefzNPCVY6f6w0DwFCqOYPDpbOW9-7w2gNWxCX1C7j4GS4BB5T4UWSht910sY9sVw4adB8kHLedR35wVxv6Trx7PprQMPmGMa-mdwuN5f2J30nQ1JlhQIxKRajSB15ria4cuO3EfpfQE64OYUDXdyM7Nih1Mgu0Z8QxF2w_AU7xPt3e0ff6C7rLOs4ZnLZMfMiQsLeGpPKpI9TkOcHanp7pg-JxKlQmONkPkin9g4qhZQkmY3LS4JJ4ZTZklWAA',
    },
  }))

  return forward(request)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const graphqlLink = from([authMiddleware, errorLink, httpLink])
