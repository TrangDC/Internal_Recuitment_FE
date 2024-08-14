import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateFeedback = () => {
  const queryKey = MODLUE_QUERY_KEY.FEEDBACK
  const getAllCandidateFeedbacks = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateJobFeedbacks',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          created_by
          owner {
            id
            hiring_team {
              id
            }
          }
          feedback
          edited
          attachments {
            id
            document_name
            document_id
          }
          created_at
        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateJobFeedbackFilter!',
      freeWord: 'CandidateJobFeedbackFreeWord',
      orderBy: 'CandidateJobFeedbackOrder',
    },
  })

  return {
    getAllCandidateFeedbacks,
    queryKey,
  }
}

export default useCandidateFeedback