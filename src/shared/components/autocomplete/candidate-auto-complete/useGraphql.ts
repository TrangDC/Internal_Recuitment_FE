import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'candidates'

  const getAllCandidates = buildQuery({
    operation: 'GetAllCandidates',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          email
          phone
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
      filter: 'CandidateFilter',
      freeWord: 'CandidateFreeWord',
      orderBy: 'CandidateOrder',
    },
  })

  return {
    queryKey,
    getAllCandidates,
  }
}

export default useGraphql
