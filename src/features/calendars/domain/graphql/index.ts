import GraphQLClientService from 'services/refactor/graphql-service'
const useGraphql = () => {
  const queryKey = 'calendar'
  const getAllCandidateInterview4Calendar = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateInterview4Calendar',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          title
          interview_date
          start_from
          end_at
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
      filter: 'CandidateInterviewCalendarFilter',
      orderBy: 'CandidateInterviewOrder',
      freeWord: 'CandidateInterviewFreeWord',
    },
  })

  const createCandidateInterview = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateInterview4Calendar',
    options: {
      type: 'mutation',
    },
    params: {
      input: 'NewCandidateInterview4CalendarInput!',
    },
  })

  return {
    getAllCandidateInterview4Calendar,
    queryKey,
    createCandidateInterview,
  }
}

export default useGraphql
