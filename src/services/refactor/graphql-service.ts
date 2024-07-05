import graphqlUrl from 'configs/api/graphql'
import { GraphQLClient } from 'graphql-request'
import {
  requestMiddleware,
  responseMiddleware,
} from 'middleware/graphql-middleware'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException, {
  CustomGraphQLResponse,
} from 'shared/interfaces/response'
import { makeLeft, makeRight } from 'shared/utils/handleEither'
interface IBuildQuery {
  operation: string
  node?: string
  params?: Record<string, string>
  options: {
    type: 'query' | 'mutation'
  }
}

export interface IBuildQueryReturn {
  operation: string
  query: string
}

class GraphQLClientService {
  static buildQuery = (props: IBuildQuery): IBuildQueryReturn => {
    const { operation, node, params, options } = props
    let paramsQuery = ''
    let operationQuery = ''
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((key) => {
        paramsQuery += `$${key}: ${params[key]}\n`
        operationQuery += `${key}: $${key}\n`
      })
    }
    const query = `
      ${options.type} ${operation}(
        ${paramsQuery}
      ) {
        ${operation}(
          ${operationQuery}
        ) ${
          node
            ? `{
          ${node}
        }`
            : ''
        } 
      }
    `
    return {
      query,
      operation,
    }
  }

  static fetchGraphQL = async (
    query: string,
    variables?: BaseRecord
  ): Promise<CustomGraphQLResponse> => {
    try {
      const response: BaseRecord = await graphQLClient.request(query, variables)
      return makeRight(response)
    } catch ({ response }: any) {
      const error = ErrorException.fromJson(response)
      return makeLeft(error)
    }
  }
}

const graphQLClient = new GraphQLClient(graphqlUrl, {
  requestMiddleware,
  responseMiddleware,
})

export default GraphQLClientService
