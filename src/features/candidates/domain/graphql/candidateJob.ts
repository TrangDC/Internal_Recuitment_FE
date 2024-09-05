import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateJobGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_JOB
  const getAllCandidateJob = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateJobs',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          attachments {
            id
            document_name
            document_id
          }
          candidate {
            name
          }
          hiring_job {
            id
            name
            location
            status
            hiring_team {
               id
               name
            }
          }
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
      filter: 'CandidateJobFilter!',
      orderBy: 'CandidateJobOrder',
      freeWord: 'CandidateJobFreeWord',
    },
  })

  return {
    getAllCandidateJob,
    queryKey,
  }
}

export default useCandidateJobGraphql
