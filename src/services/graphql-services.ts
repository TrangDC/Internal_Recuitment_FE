import appConfig from 'configs/appConfig'
import { GraphQLClient } from 'graphql-request'
import {
  requestMiddleware,
  responseMiddleware,
} from 'middleware/graphql-middleware'
interface IbuildQuery {
  operation: string
  node: string
  params?: Record<string, string>
  options: {
    type: 'query' | 'mutation'
  }
}

export interface IbuildQueryReturn {
  operation: string
  query: string
}

export const buildQuery = (props: IbuildQuery): IbuildQueryReturn => {
  const { operation, node, params, options } = props
  let paramsQuery = ''
  let operationQuery = ''
  let nodeQuery = ''

  if (params && Object.keys(params).length > 0) {
    Object.keys(params).forEach((key) => {
      paramsQuery += `$${key}: ${params[key]}\n`
      operationQuery += `${key}: $${key}\n`
    })
  }

  if(node) {
    nodeQuery = `{${node}}`
  }
  
  const query = `
      ${options.type} ${operation}(
        ${paramsQuery}
      ) {
        ${operation}(
          ${operationQuery}
        ) ${nodeQuery}
      }
    `
   
  return {
    query,
    operation,
  }
}

export const graphQLClient = new GraphQLClient(appConfig.endpoint_api, {
  requestMiddleware,
  responseMiddleware,
})

export const fetchGraphQL = async <T extends object>(
  query: any,
  variables?: any
): Promise<T> => {
  return await graphQLClient.request(query, variables)
}
