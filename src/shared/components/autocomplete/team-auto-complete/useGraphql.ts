import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.TEAM

  const getAllTeams = GraphQLClientService.buildQuery({
    operation: 'SelectionTeams',
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
      filter: 'TeamFilter',
      freeWord: 'TeamFreeWord',
      orderBy: 'TeamOrderBy!',
    },
  })

  return {
    queryKey,
    getAllTeams,
  }
}

export default useGraphql
