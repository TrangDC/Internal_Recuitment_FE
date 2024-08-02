import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.INTERVIEWER
  const getAllUsers = GraphQLClientService.buildQuery({
    operation: 'SelectionUsers',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          work_email
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
      filter: 'UserFilter',
      freeWord: 'UserFreeWord',
      orderBy: 'UserOrder',
    },
  })

  return {
    queryKey,
    getAllUsers,
  }
}

export default useGraphql