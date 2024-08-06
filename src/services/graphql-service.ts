import graphqlUrl from 'configs/api/graphql'
import { graphqlClient } from 'middleware/graphql-middleware'
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
    queryString: IBuildQueryReturn,
    variables?: BaseRecord
  ): Promise<CustomGraphQLResponse> => {
    try {
      const response: BaseRecord = await graphqlClient.post(graphqlUrl, {
        operationName: queryString.operation,
        query: queryString.query,
        variables: variables,
      })
      const errors = response?.data
      if (ErrorException.hasError(errors)) {
        const error = ErrorException.fromJson(errors)
        return makeLeft(error)
      }
      const data = response?.data?.data
      return makeRight(data)
    } catch (errors: any) {
      const data = (errors?.response?.data ?? {}) as BaseRecord
      const error = ErrorException.fromJson(data)
      return makeLeft(error)
    }
  }
}

export default GraphQLClientService
