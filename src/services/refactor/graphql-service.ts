import { QueryClient } from '@tanstack/react-query'
import appConfig from 'configs/appConfig'
import { GraphQLClient } from 'graphql-request'
import { requestMiddleware, responseMiddleware } from 'middleware/graphql-middleware'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException, {
  CustomGraphQLResponse,
} from 'shared/interfaces/response'
import { makeLeft, makeRight } from 'shared/utils/handleEither'
interface IbuildQuery {
  operation: string
  node?: string
  params?: Record<string, string>
  options: {
    type: 'query' | 'mutation'
  }
}

export interface IbuildQueryReturn {
  operation: string
  query: string
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

class GraphQLClientService {
  static buildQuery = (props: IbuildQuery): IbuildQueryReturn => {
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

const graphQLClient = new GraphQLClient(appConfig.endpoint_api, {
  requestMiddleware,
  responseMiddleware,
})

export default GraphQLClientService
