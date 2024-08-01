import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB_POSITION
  const getAllJobOptions = GraphQLClientService.buildQuery({
    operation: 'SelectionJobPositions',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
        }
      }
      pagination {
        page
        perPage
        total
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'JobPositionFilter',
      orderBy: 'JobPositionOrder',
      freeWord: 'JobPositionFreeWord',
    },
  })

  return {
    queryKey,
    getAllJobOptions,
  }
}

export default useGraphql
