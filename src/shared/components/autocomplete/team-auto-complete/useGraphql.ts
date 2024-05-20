import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'teams'

  const getAllTeams = buildQuery({
    operation: 'GetAllTeams',
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
