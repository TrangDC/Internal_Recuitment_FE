import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.REC_TEAM

  const getAllRecTeams = GraphQLClientService.buildQuery({
    operation: 'SelectionRecTeams',
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
      filter: 'RecTeamFilter',
      freeWord: 'RecTeamFreeWord',
      orderBy: 'RecTeamOrderBy',
    },
  })

  return {
    queryKey,
    getAllRecTeams,
  }
}

export default useGraphql
