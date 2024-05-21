import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB

  const getAllCandidateJobs = buildQuery({
    operation: 'GetAllCandidateJobs',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          candidate {
            id
            name
            email
            phone
          }
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
      filter: 'CandidateJobFilter!',
      freeWord: 'CandidateJobFreeWord',
      orderBy: 'CandidateJobOrder',
    },
  })

  return {
    queryKey,
    getAllCandidateJobs,
  }
}

export default useGraphql
