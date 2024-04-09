import { ApolloClient, DocumentNode, InMemoryCache, gql } from '@apollo/client'
import { graphqlLink } from 'middleware/graphql-middleware'
export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: graphqlLink,
})

interface IbuildQuery {
  operation: string
  node: string
  params: Record<string, string>
  options: {
    type: 'query' | 'mutation'
  }
}

export interface IbuildQueryReturn {
  operation: string
  query: DocumentNode
}

export const buildQuery = (props: IbuildQuery): IbuildQueryReturn => {
  const { operation, node, params, options } = props
  let paramsQuery = ''
  let operationQuery = ''
  if (Object.keys(params).length > 0) {
    Object.keys(params).forEach((key) => {
      paramsQuery += `$${key}: ${params[key]}\n`
      operationQuery += `${key}: $${key}\n`
    })
  }
  const query = gql`
      ${options.type} ${operation}(
        ${paramsQuery}
      ) {
        ${operation}(
          ${operationQuery}
        ) {
          ${node}
        }
      }
    `
  return {
    query,
    operation,
  }
}
