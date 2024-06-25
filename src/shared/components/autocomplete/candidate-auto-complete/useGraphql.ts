import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE
  const getAllCandidates = buildQuery({
    operation: 'SelectionCandidates',
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
          status
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
