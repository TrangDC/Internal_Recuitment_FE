import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.INTERVIEWER
  const getAllUsers = buildQuery({
    operation: 'SelectionUsers',
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
