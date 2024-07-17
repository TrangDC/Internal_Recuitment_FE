import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.ROLE_TEMPLATE
  const getAllUsers = GraphQLClientService.buildQuery({
    operation: 'GetAllRoles',
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
      filter: 'RoleFilter',
      freeWord: 'RoleFreeWord',
      orderBy: 'RoleOrder',
    },
  })

  return {
    queryKey,
    getAllUsers,
  }
}

export default useGraphql
