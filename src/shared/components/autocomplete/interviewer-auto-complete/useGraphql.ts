import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'candidates'

  const getAllUsers = buildQuery({
    operation: 'GetAllUsers',
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
