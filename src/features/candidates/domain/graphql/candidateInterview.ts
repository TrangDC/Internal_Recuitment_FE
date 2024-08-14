import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateInterview = () => {
  const queryKey = MODLUE_QUERY_KEY.INTERVIEW
  const getAllCandidateInterviews = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateInterviews',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          title
          description
          interview_date
          start_from
          end_at
          interviewer {
            id
            name
          }
          edit_able
          owner{
            id
            name
            hiring_team {
              id
            }
          }
          status
          edited
          location
          meeting_link
          created_at
        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateInterviewFilter!',
      freeWord: 'CandidateInterviewFreeWord',
      orderBy: 'CandidateInterviewOrder',
    },
  })

  return {
    getAllCandidateInterviews,
    queryKey,
  }
}

export default useCandidateInterview
